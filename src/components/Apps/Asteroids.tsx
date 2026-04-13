import { useEffect, useRef, useState } from 'react'

interface Vec2 { x: number; y: number }

interface Ship {
  pos: Vec2
  vel: Vec2
  angle: number
  alive: boolean
  invincible: number
}

interface Bullet {
  pos: Vec2
  vel: Vec2
  life: number
}

interface Asteroid {
  pos: Vec2
  vel: Vec2
  radius: number
  angle: number
  spin: number
  vertices: number[]
}

interface Particle {
  pos: Vec2
  vel: Vec2
  life: number
  maxLife: number
}

function randomAsteroid(W: number, H: number, radius: number, avoidPos?: Vec2): Asteroid {
  let pos: Vec2
  do {
    pos = { x: Math.random() * W, y: Math.random() * H }
  } while (avoidPos && Math.hypot(pos.x - avoidPos.x, pos.y - avoidPos.y) < 150)

  const speed = (Math.random() * 0.8 + 0.3) * (40 / radius)
  const angle = Math.random() * Math.PI * 2
  const numV  = Math.floor(Math.random() * 5) + 7
  const vertices = Array.from({ length: numV }, () => radius * (0.7 + Math.random() * 0.4))
  return {
    pos,
    vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
    radius,
    angle: 0,
    spin: (Math.random() - 0.5) * 0.05,
    vertices,
  }
}

export function AsteroidsGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef  = useRef({
    ship: null as Ship | null,
    bullets: [] as Bullet[],
    asteroids: [] as Asteroid[],
    particles: [] as Particle[],
    score: 0,
    lives: 3,
    level: 1,
    gameOver: false,
    started: false,
    keys: {} as Record<string, boolean>,
    shootCooldown: 0,
    respawnTimer: 0,
  })
  const animRef = useRef<number>(0)
  const [display, setDisplay] = useState({ score: 0, lives: 3, level: 1, gameOver: false, started: false })
  const isMobile = window.innerWidth < 768

  function initGame(W: number, H: number) {
    const s = stateRef.current
    s.ship = {
      pos: { x: W / 2, y: H / 2 },
      vel: { x: 0, y: 0 },
      angle: -Math.PI / 2,
      alive: true,
      invincible: 180,
    }
    s.bullets      = []
    s.particles    = []
    s.score        = 0
    s.lives        = 3
    s.level        = 1
    s.gameOver     = false
    s.started      = true
    s.shootCooldown = 0
    s.respawnTimer  = 0
    s.asteroids = Array.from({ length: 4 }, () => randomAsteroid(W, H, 40, s.ship!.pos))
  }

  function spawnParticles(pos: Vec2, count: number, particles: Particle[]) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2
      const speed = Math.random() * 3 + 1
      particles.push({
        pos: { x: pos.x, y: pos.y },
        vel: { x: Math.cos(a) * speed, y: Math.sin(a) * speed },
        life: 60,
        maxLife: 60,
      })
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width
    const H = canvas.height

    // ── Keyboard ──────────────────────────────────────────────────────────────
    const onKeyDown = (e: KeyboardEvent) => {
      stateRef.current.keys[e.key] = true
      if ([' ', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault()
      if (e.key === 'Enter') {
        const s = stateRef.current
        if (!s.started || s.gameOver) {
          initGame(W, H)
          setDisplay({ score: 0, lives: 3, level: 1, gameOver: false, started: true })
        }
      }
    }
    const onKeyUp = (e: KeyboardEvent) => { stateRef.current.keys[e.key] = false }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup',   onKeyUp)

    // ── Touch controls ────────────────────────────────────────────────────────
    let lastTap    = 0
    let thrustTouch = false

    function onTouchStart(e: TouchEvent) {
      e.preventDefault()
      const s = stateRef.current
      if (!s.started || s.gameOver) {
        initGame(W, H)
        setDisplay({ score: 0, lives: 3, level: 1, gameOver: false, started: true })
        return
      }
      const now = Date.now()
      if (now - lastTap < 280) {
        // Double tap = shoot
        s.keys[' '] = true
        setTimeout(() => { s.keys[' '] = false }, 80)
      }
      lastTap = now

      const touch = e.touches[0]
      const rect  = canvas!.getBoundingClientRect()
      const rx = (touch.clientX - rect.left) / rect.width
      const ry = (touch.clientY - rect.top)  / rect.height

      // Clear directional keys first
      s.keys['ArrowLeft']  = false
      s.keys['ArrowRight'] = false
      s.keys['ArrowUp']    = false
      thrustTouch = false

      if (ry < 0.35) {
        s.keys['ArrowUp'] = true
        thrustTouch = true
      } else if (rx < 0.35) {
        s.keys['ArrowLeft'] = true
      } else if (rx > 0.65) {
        s.keys['ArrowRight'] = true
      } else {
        // Centre bottom = shoot
        s.keys[' '] = true
        setTimeout(() => { s.keys[' '] = false }, 80)
      }
    }

    function onTouchEnd(e: TouchEvent) {
      e.preventDefault()
      const s = stateRef.current
      s.keys['ArrowLeft']  = false
      s.keys['ArrowRight'] = false
      if (thrustTouch) {
        s.keys['ArrowUp'] = false
        thrustTouch = false
      }
    }

    function onTouchMove(e: TouchEvent) {
      e.preventDefault()
      const s     = stateRef.current
      const touch = e.touches[0]
      const rect  = canvas!.getBoundingClientRect()
      const rx = (touch.clientX - rect.left) / rect.width
      const ry = (touch.clientY - rect.top)  / rect.height

      s.keys['ArrowLeft']  = rx < 0.35 && ry >= 0.35
      s.keys['ArrowRight'] = rx > 0.65 && ry >= 0.35
      if (thrustTouch) s.keys['ArrowUp'] = ry < 0.35
    }

    canvas.addEventListener('touchstart', onTouchStart, { passive: false })
    canvas.addEventListener('touchend',   onTouchEnd,   { passive: false })
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false })

    // ── Helpers ───────────────────────────────────────────────────────────────
    function wrap(v: Vec2) {
      if (v.x < 0)  v.x += W
      if (v.x > W)  v.x -= W
      if (v.y < 0)  v.y += H
      if (v.y > H)  v.y -= H
    }

    function drawShip(ship: Ship) {
      if (!ship.alive) return
      if (ship.invincible > 0 && Math.floor(ship.invincible / 5) % 2 === 0) return
      ctx.save()
      ctx.translate(ship.pos.x, ship.pos.y)
      ctx.rotate(ship.angle)
      ctx.strokeStyle  = '#00ff46'
      ctx.lineWidth    = 2
      ctx.shadowColor  = '#00ff46'
      ctx.shadowBlur   = 8
      ctx.beginPath()
      ctx.moveTo(20, 0)
      ctx.lineTo(-12, -10)
      ctx.lineTo(-8, 0)
      ctx.lineTo(-12, 10)
      ctx.closePath()
      ctx.stroke()
      if (stateRef.current.keys['ArrowUp']) {
        ctx.strokeStyle = '#ff8800'
        ctx.shadowColor = '#ff8800'
        ctx.beginPath()
        ctx.moveTo(-8, -5)
        ctx.lineTo(-18 - Math.random() * 8, 0)
        ctx.lineTo(-8, 5)
        ctx.stroke()
      }
      ctx.restore()
    }

    function drawAsteroid(a: Asteroid) {
      ctx.save()
      ctx.translate(a.pos.x, a.pos.y)
      ctx.rotate(a.angle)
      ctx.strokeStyle = '#00c8ff'
      ctx.lineWidth   = 1.5
      ctx.shadowColor = '#00c8ff'
      ctx.shadowBlur  = 4
      ctx.beginPath()
      const step = (Math.PI * 2) / a.vertices.length
      a.vertices.forEach((r, i) => {
        const x = Math.cos(i * step) * r
        const y = Math.sin(i * step) * r
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
    }

    // ── Draw mobile zone overlay ──────────────────────────────────────────────
    function drawMobileZones() {
      // Subtle zone indicators
      ctx.fillStyle = 'rgba(255,255,255,0.03)'
      ctx.fillRect(0, 0, W * 0.35, H)          // left = rotate left
      ctx.fillRect(W * 0.65, 0, W * 0.35, H)   // right = rotate right
      ctx.fillStyle = 'rgba(0,255,70,0.04)'
      ctx.fillRect(0, 0, W, H * 0.35)           // top = thrust

      ctx.fillStyle = 'rgba(0,255,70,0.2)'
      ctx.font = '10px JetBrains Mono'
      ctx.textAlign = 'center'
      ctx.fillText('▲ THRUST', W / 2, 16)
      ctx.fillStyle = 'rgba(200,200,200,0.2)'
      ctx.textAlign = 'left'
      ctx.fillText('◀', 8, H / 2)
      ctx.textAlign = 'right'
      ctx.fillText('▶', W - 8, H / 2)
      ctx.textAlign = 'center'
      ctx.fillText('● SHOOT', W / 2, H - 10)
    }

    // ── Main loop ─────────────────────────────────────────────────────────────
    function loop() {
      const s = stateRef.current
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0, 0, W, H)

      // Start screen
      if (!s.started) {
        ctx.fillStyle = '#0a0a0a'
        ctx.fillRect(0, 0, W, H)
        ctx.fillStyle = '#00ff46'
        ctx.font = 'bold 28px JetBrains Mono'
        ctx.textAlign = 'center'
        ctx.fillText('ASTEROIDS', W / 2, H / 2 - 50)
        ctx.font = '14px JetBrains Mono'
        ctx.fillStyle = '#aaa'
        if (isMobile) {
          ctx.fillText('Tap to start', W / 2, H / 2 - 10)
          ctx.fillText('Top = Thrust  |  Left/Right = Rotate', W / 2, H / 2 + 16)
          ctx.fillText('Centre = Shoot  |  Double tap = Shoot', W / 2, H / 2 + 38)
        } else {
          ctx.fillText('Press ENTER to start', W / 2, H / 2 - 10)
          ctx.fillText('Arrow keys to move  |  Space to shoot', W / 2, H / 2 + 16)
        }
        animRef.current = requestAnimationFrame(loop)
        return
      }

      // Game over screen
      if (s.gameOver) {
        ctx.fillStyle = '#0a0a0a'
        ctx.fillRect(0, 0, W, H)
        ctx.fillStyle = '#ff5050'
        ctx.font = 'bold 28px JetBrains Mono'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER', W / 2, H / 2 - 40)
        ctx.fillStyle = '#00ff46'
        ctx.font = '16px JetBrains Mono'
        ctx.fillText('Score: ' + s.score, W / 2, H / 2)
        ctx.fillStyle = '#aaa'
        ctx.font = '13px JetBrains Mono'
        ctx.fillText(isMobile ? 'Tap to restart' : 'Press ENTER to restart', W / 2, H / 2 + 36)
        animRef.current = requestAnimationFrame(loop)
        return
      }

      const ship = s.ship!

      // Update ship
      if (ship.alive) {
        if (s.keys['ArrowLeft'])  ship.angle -= 0.05
        if (s.keys['ArrowRight']) ship.angle += 0.05
        if (s.keys['ArrowUp']) {
          ship.vel.x += Math.cos(ship.angle) * 0.3
          ship.vel.y += Math.sin(ship.angle) * 0.3
        }
        ship.vel.x *= 0.98
        ship.vel.y *= 0.98
        ship.pos.x += ship.vel.x
        ship.pos.y += ship.vel.y
        wrap(ship.pos)
        if (ship.invincible > 0) ship.invincible--

        if ((s.keys[' '] || s.keys['Space']) && s.shootCooldown <= 0) {
          s.bullets.push({
            pos: { x: ship.pos.x + Math.cos(ship.angle) * 22, y: ship.pos.y + Math.sin(ship.angle) * 22 },
            vel: { x: Math.cos(ship.angle) * 8 + ship.vel.x,  y: Math.sin(ship.angle) * 8 + ship.vel.y  },
            life: 60,
          })
          s.shootCooldown = 12
        }
        if (s.shootCooldown > 0) s.shootCooldown--
      } else {
        s.respawnTimer--
        if (s.respawnTimer <= 0) {
          ship.pos = { x: W / 2, y: H / 2 }
          ship.vel = { x: 0, y: 0 }
          ship.alive = true
          ship.invincible = 180
        }
      }

      // Update bullets
      s.bullets = s.bullets.filter(b => {
        b.pos.x += b.vel.x
        b.pos.y += b.vel.y
        wrap(b.pos)
        b.life--
        return b.life > 0
      })

      // Update asteroids
      s.asteroids.forEach(a => {
        a.pos.x += a.vel.x
        a.pos.y += a.vel.y
        a.angle += a.spin
        wrap(a.pos)
      })

      // Update particles
      s.particles = s.particles.filter(p => {
        p.pos.x += p.vel.x
        p.pos.y += p.vel.y
        p.vel.x *= 0.95
        p.vel.y *= 0.95
        p.life--
        return p.life > 0
      })

      // Bullet-asteroid collisions
      s.bullets.forEach((b, bi) => {
        s.asteroids.forEach((a, ai) => {
          if (Math.hypot(b.pos.x - a.pos.x, b.pos.y - a.pos.y) < a.radius) {
            spawnParticles(a.pos, 8, s.particles)
            s.bullets.splice(bi, 1)
            const newAsteroids: Asteroid[] = []
            if (a.radius > 20) {
              for (let i = 0; i < 2; i++) {
                const child = randomAsteroid(W, H, a.radius / 2)
                child.pos = { x: a.pos.x, y: a.pos.y }
                newAsteroids.push(child)
              }
            }
            s.asteroids.splice(ai, 1)
            s.asteroids.push(...newAsteroids)
            s.score += a.radius > 30 ? 20 : a.radius > 15 ? 50 : 100
            setDisplay(d => ({ ...d, score: s.score }))
          }
        })
      })

      // Ship-asteroid collisions
      if (ship.alive && ship.invincible <= 0) {
        s.asteroids.forEach(a => {
          if (Math.hypot(ship.pos.x - a.pos.x, ship.pos.y - a.pos.y) < a.radius + 12) {
            spawnParticles(ship.pos, 20, s.particles)
            ship.alive = false
            s.lives--
            s.respawnTimer = 120
            if (s.lives <= 0) {
              s.gameOver = true
              setDisplay(d => ({ ...d, gameOver: true, score: s.score }))
            } else {
              setDisplay(d => ({ ...d, lives: s.lives }))
            }
          }
        })
      }

      // Next level
      if (s.asteroids.length === 0) {
        s.level++
        s.asteroids = Array.from({ length: 3 + s.level }, () => randomAsteroid(W, H, 40, ship.pos))
        setDisplay(d => ({ ...d, level: s.level }))
      }

      // Draw everything
      drawShip(ship)

      s.bullets.forEach(b => {
        ctx.beginPath()
        ctx.arc(b.pos.x, b.pos.y, 2, 0, Math.PI * 2)
        ctx.fillStyle   = '#ffd700'
        ctx.shadowColor = '#ffd700'
        ctx.shadowBlur  = 6
        ctx.fill()
        ctx.shadowBlur = 0
      })

      s.asteroids.forEach(a => drawAsteroid(a))

      s.particles.forEach(p => {
        const alpha = p.life / p.maxLife
        ctx.beginPath()
        ctx.arc(p.pos.x, p.pos.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,${Math.floor(100 + 155 * alpha)},0,${alpha})`
        ctx.fill()
      })

      // Mobile zone hints (subtle)
      if (isMobile && s.started && !s.gameOver) {
        drawMobileZones()
      }

      animRef.current = requestAnimationFrame(loop)
    }

    // ── Start ─────────────────────────────────────────────────────────────────
    animRef.current = requestAnimationFrame(loop)

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup',   onKeyUp)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchend',   onTouchEnd)
      canvas.removeEventListener('touchmove',  onTouchMove)
    }
  }, [])

  return (
    <div style={{ background: '#0a0a0a', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 16px', borderBottom: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 12 }}>
        <span style={{ color: '#00ff46' }}>Score: {display.score}</span>
        <span style={{ color: '#ffd700' }}>Level: {display.level}</span>
        <span style={{ color: '#ff5050' }}>{'♥ '.repeat(display.lives)}</span>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={640}
        height={420}
        style={{ flex: 1, display: 'block', width: '100%', height: '100%', touchAction: 'none' }}
        tabIndex={0}
      />

      {/* Footer hint */}
      <div style={{ padding: '4px 16px', borderTop: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 11, color: '#555', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {isMobile ? (
          <>
            <span>Top = Thrust</span>
            <span>Left/Right = Rotate</span>
            <span>Centre = Shoot</span>
            <span>Double tap = Shoot</span>
            <span>Tap = Start</span>
          </>
        ) : (
          <>
            <span>↑ Thrust</span>
            <span>← → Rotate</span>
            <span>Space Shoot</span>
            <span>Enter Start</span>
          </>
        )}
      </div>
    </div>
  )
}