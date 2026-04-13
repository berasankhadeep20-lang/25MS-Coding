import { useEffect, useRef, useState } from 'react'

export function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    ball: { x: 320, y: 210, vx: 2.5, vy: 2 },
    p1: { y: 160, score: 0 },
    p2: { y: 160, score: 0 },
    keys: {} as Record<string, boolean>,
    gameOver: false,
    started: false,
    winner: '',
  })
  const leftUpRef   = useRef(false)
  const leftDownRef = useRef(false)
  const rightUpRef  = useRef(false)
  const rightDownRef= useRef(false)
  const animRef = useRef<number>(0)
  const [display, setDisplay] = useState({ p1: 0, p2: 0, gameOver: false, winner: '', started: false })
  const isMobile = window.innerWidth < 768

  const PH = 80
  const PW = 10
  const BALL_R = 7
  const W = 640
  const H = 420
  const WIN_SCORE = 7

  function startGame() {
    const s = stateRef.current
    s.ball = { x: W / 2, y: H / 2, vx: 4 * (Math.random() > 0.5 ? 1 : -1), vy: 3 * (Math.random() > 0.5 ? 1 : -1) }
    s.p1 = { y: H / 2 - PH / 2, score: 0 }
    s.p2 = { y: H / 2 - PH / 2, score: 0 }
    s.gameOver = false
    s.started = true
    s.winner = ''
    setDisplay({ p1: 0, p2: 0, gameOver: false, winner: '', started: true })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const onKey = (e: KeyboardEvent, down: boolean) => {
      stateRef.current.keys[e.key] = down
      if (['w', 's', 'ArrowUp', 'ArrowDown'].includes(e.key)) e.preventDefault()
      if (down && e.key === 'Enter') startGame()
    }

    window.addEventListener('keydown', e => onKey(e, true))
    window.addEventListener('keyup',   e => onKey(e, false))

    // Touch drag: left half → P1, right half → P2
    function onTouchMove(e: TouchEvent) {
      e.preventDefault()
      Array.from(e.touches).forEach(touch => {
        const rect = canvas!.getBoundingClientRect()
        const relY = ((touch.clientY - rect.top) / rect.height) * H
        const relX = touch.clientX - rect.left
        if (relX < rect.width / 2) {
          stateRef.current.p1.y = Math.max(0, Math.min(H - PH, relY - PH / 2))
        } else {
          stateRef.current.p2.y = Math.max(0, Math.min(H - PH, relY - PH / 2))
        }
      })
    }
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault()
      if (!stateRef.current.started || stateRef.current.gameOver) startGame()
    }, { passive: false })

    function drawRect(x: number, y: number, w: number, h: number, color: string) {
      ctx.fillStyle = color
      ctx.shadowColor = color
      ctx.shadowBlur = 8
      ctx.fillRect(x, y, w, h)
      ctx.shadowBlur = 0
    }

    function drawBall(x: number, y: number) {
      ctx.beginPath()
      ctx.arc(x, y, BALL_R, 0, Math.PI * 2)
      ctx.fillStyle = '#ffd700'
      ctx.shadowColor = '#ffd700'
      ctx.shadowBlur = 12
      ctx.fill()
      ctx.shadowBlur = 0
    }

    function drawNet() {
      ctx.setLineDash([10, 10])
      ctx.strokeStyle = '#222'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(W / 2, 0)
      ctx.lineTo(W / 2, H)
      ctx.stroke()
      ctx.setLineDash([])
    }

    function loop() {
      const s = stateRef.current
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, W, H)
      drawNet()

      if (!s.started) {
        ctx.fillStyle = '#00ff46'
        ctx.font = 'bold 28px JetBrains Mono'
        ctx.textAlign = 'center'
        ctx.fillText('PONG', W / 2, H / 2 - 60)
        ctx.fillStyle = '#aaa'
        ctx.font = '13px JetBrains Mono'
        if (isMobile) {
          ctx.fillText('Drag left side → P1', W / 2, H / 2 - 16)
          ctx.fillText('Drag right side → P2', W / 2, H / 2 + 8)
          ctx.fillStyle = '#00ff46'
          ctx.fillText('Tap to start', W / 2, H / 2 + 50)
        } else {
          ctx.fillText('Player 1: W / S keys', W / 2, H / 2 - 16)
          ctx.fillText('Player 2: ↑ / ↓ keys', W / 2, H / 2 + 8)
          ctx.fillStyle = '#00ff46'
          ctx.fillText('Press ENTER to start', W / 2, H / 2 + 50)
        }
        animRef.current = requestAnimationFrame(loop)
        return
      }

      if (s.gameOver) {
        ctx.fillStyle = '#ffd700'
        ctx.font = 'bold 24px JetBrains Mono'
        ctx.textAlign = 'center'
        ctx.fillText(s.winner + ' WINS!', W / 2, H / 2 - 20)
        ctx.fillStyle = '#aaa'
        ctx.font = '13px JetBrains Mono'
        ctx.fillText(isMobile ? 'Tap to restart' : 'Press ENTER to restart', W / 2, H / 2 + 20)
        animRef.current = requestAnimationFrame(loop)
        return
      }

      const SPEED = 3
      // Keyboard
      if (s.keys['w'] && s.p1.y > 0)              s.p1.y -= SPEED
      if (s.keys['s'] && s.p1.y < H - PH)         s.p1.y += SPEED
      if (s.keys['ArrowUp'] && s.p2.y > 0)        s.p2.y -= SPEED
      if (s.keys['ArrowDown'] && s.p2.y < H - PH) s.p2.y += SPEED
      // Button refs (mobile buttons)
      if (leftUpRef.current   && s.p1.y > 0)      s.p1.y -= SPEED
      if (leftDownRef.current && s.p1.y < H - PH) s.p1.y += SPEED
      if (rightUpRef.current  && s.p2.y > 0)      s.p2.y -= SPEED
      if (rightDownRef.current&& s.p2.y < H - PH) s.p2.y += SPEED

      s.ball.x += s.ball.vx
      s.ball.y += s.ball.vy

      if (s.ball.y - BALL_R < 0 || s.ball.y + BALL_R > H) s.ball.vy *= -1

      // P1 paddle
      if (s.ball.x - BALL_R < PW + 20 && s.ball.y > s.p1.y && s.ball.y < s.p1.y + PH) {
        s.ball.vx = Math.abs(s.ball.vx) * 1.01
        s.ball.vy = ((s.ball.y - s.p1.y) / PH - 0.5) * 8
      }
      // P2 paddle
      if (s.ball.x + BALL_R > W - PW - 20 && s.ball.y > s.p2.y && s.ball.y < s.p2.y + PH) {
        s.ball.vx = -Math.abs(s.ball.vx) * 1.01
        s.ball.vy = ((s.ball.y - s.p2.y) / PH - 0.5) * 8
      }

      s.ball.vx = Math.max(-6, Math.min(6, s.ball.vx))
      s.ball.vy = Math.max(-5, Math.min(5, s.ball.vy))

      if (s.ball.x < 0) {
        s.p2.score++
        s.ball = { x: W / 2, y: H / 2, vx: -2.5, vy: 2 * (Math.random() > 0.5 ? 1 : -1) }
        setDisplay(d => ({ ...d, p2: s.p2.score }))
        if (s.p2.score >= WIN_SCORE) { s.gameOver = true; s.winner = 'Player 2'; setDisplay(d => ({ ...d, gameOver: true, winner: 'Player 2' })) }
      }
      if (s.ball.x > W) {
        s.p1.score++
        s.ball = { x: W / 2, y: H / 2, vx: 2.5, vy: 2 * (Math.random() > 0.5 ? 1 : -1) }
        setDisplay(d => ({ ...d, p1: s.p1.score }))
        if (s.p1.score >= WIN_SCORE) { s.gameOver = true; s.winner = 'Player 1'; setDisplay(d => ({ ...d, gameOver: true, winner: 'Player 1' })) }
      }

      drawRect(20, s.p1.y, PW, PH, '#00ff46')
      drawRect(W - PW - 20, s.p2.y, PW, PH, '#00c8ff')
      drawBall(s.ball.x, s.ball.y)

      ctx.fillStyle = '#00ff46'
      ctx.font = 'bold 32px JetBrains Mono'
      ctx.textAlign = 'center'
      ctx.fillText(String(s.p1.score), W / 4, 48)
      ctx.fillStyle = '#00c8ff'
      ctx.fillText(String(s.p2.score), (W * 3) / 4, 48)

      // Mobile touch zones hint
      if (isMobile && s.started) {
        ctx.fillStyle = 'rgba(0,255,70,0.04)'
        ctx.fillRect(0, 0, W / 2, H)
        ctx.fillStyle = 'rgba(0,200,255,0.04)'
        ctx.fillRect(W / 2, 0, W / 2, H)
        ctx.fillStyle = 'rgba(0,255,70,0.15)'
        ctx.font = '10px JetBrains Mono'
        ctx.textAlign = 'left'
        ctx.fillText('← drag P1', 8, H - 8)
        ctx.fillStyle = 'rgba(0,200,255,0.15)'
        ctx.textAlign = 'right'
        ctx.fillText('P2 drag →', W - 8, H - 8)
      }

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('keydown', e => onKey(e, true))
      window.removeEventListener('keyup',   e => onKey(e, false))
      canvas.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  const btnStyle: React.CSSProperties = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    fontSize: 26,
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  }

  return (
    <div style={{ background: '#0a0a0a', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 16px', borderBottom: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 12 }}>
        <span style={{ color: '#00ff46' }}>{isMobile ? 'P1 ← drag' : 'P1 — W/S'}</span>
        <span style={{ color: '#ffd700' }}>First to {WIN_SCORE}</span>
        <span style={{ color: '#00c8ff' }}>{isMobile ? 'drag → P2' : 'P2 — ↑/↓'}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ flex: 1, display: 'block', width: '100%', touchAction: 'none' }}
        tabIndex={0}
      />

      {/* Mobile button controls — alternative to drag */}
      {isMobile && (
        <div style={{ display: 'flex', borderTop: '1px solid #1a1a1a', background: '#0d0d0d', flexShrink: 0 }}>
          {/* P1 buttons */}
          <div style={{ flex: 1, display: 'flex', borderRight: '1px solid #1a1a1a' }}>
            <button style={{ ...btnStyle, color: '#00ff46' }}
              onTouchStart={e => { e.preventDefault(); leftUpRef.current = true }}
              onTouchEnd={e => { e.preventDefault(); leftUpRef.current = false }}
              onMouseDown={() => { leftUpRef.current = true }}
              onMouseUp={() => { leftUpRef.current = false }}>▲</button>
            <button style={{ ...btnStyle, color: '#00ff46' }}
              onTouchStart={e => { e.preventDefault(); leftDownRef.current = true }}
              onTouchEnd={e => { e.preventDefault(); leftDownRef.current = false }}
              onMouseDown={() => { leftDownRef.current = true }}
              onMouseUp={() => { leftDownRef.current = false }}>▼</button>
          </div>
          {/* Start button */}
          <button
            style={{ ...btnStyle, flex: 0, padding: '0 14px', color: '#ffd700', fontSize: 12, fontFamily: 'JetBrains Mono', borderLeft: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a' }}
            onTouchStart={e => { e.preventDefault(); startGame() }}
            onMouseDown={() => startGame()}>
            {display.started ? '↺' : '▶'}
          </button>
          {/* P2 buttons */}
          <div style={{ flex: 1, display: 'flex' }}>
            <button style={{ ...btnStyle, color: '#00c8ff' }}
              onTouchStart={e => { e.preventDefault(); rightUpRef.current = true }}
              onTouchEnd={e => { e.preventDefault(); rightUpRef.current = false }}
              onMouseDown={() => { rightUpRef.current = true }}
              onMouseUp={() => { rightUpRef.current = false }}>▲</button>
            <button style={{ ...btnStyle, color: '#00c8ff' }}
              onTouchStart={e => { e.preventDefault(); rightDownRef.current = true }}
              onTouchEnd={e => { e.preventDefault(); rightDownRef.current = false }}
              onMouseDown={() => { rightDownRef.current = true }}
              onMouseUp={() => { rightDownRef.current = false }}>▼</button>
          </div>
        </div>
      )}

      {!isMobile && (
        <div style={{ padding: '4px 16px', borderTop: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 11, color: '#555' }}>
          Press Enter to start/restart
        </div>
      )}
    </div>
  )
}