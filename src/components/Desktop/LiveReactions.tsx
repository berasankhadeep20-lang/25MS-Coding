import { useState, useEffect } from 'react'

interface Reaction {
  id: number
  emoji: string
  x: number
  y: number
  label: string
}

const APP_REACTIONS: Record<string, string> = {
  asteroids: '🚀', pong: '🏓', flappy: '🐦', snake: '🐍',
  dungeon: '⚔', gameoflife: '🔲', typing: '⌨', minesweeper: '💣',
  periodic: '⚗', gravity: '🪐', dna: '🧬', fourier: '〜',
  mandelbrot: '🌀', isstrack: '🛸', apod: '🔭',
  tamagotchi: '🐣', stocks: '📈', magic8: '🎱',
  lovecalc: '❤', linuscall: '📞', fortunecook: '🥠',
  horoscope: '♈', debate: '⚖', confession: '🤫',
  slashdotai: '🤖', blog: '📰', newsletter: '📬',
  halloffame: '🏆', resources: '📚', rules: '📜',
  paint: '🖌', pixelart: '🟦', showcase: '🌟',
  guestbook: '📖', poll: '📊', events: '📅',
  home: '⌂', about: '📄', team: '👥',
}

let reactionId = 0

export function LiveReactions() {
  const [reactions, setReactions] = useState<Reaction[]>([])

  useEffect(function() {
    const handler = function(e: Event) {
      const { appId } = (e as CustomEvent).detail
      const emoji = APP_REACTIONS[appId] ?? '✨'
      const id = ++reactionId
      const x = 60 + Math.random() * (window.innerWidth - 160)
      const y = 40 + Math.random() * (window.innerHeight - 120)
      setReactions(prev => [...prev, { id, emoji, x, y, label: appId }])
      setTimeout(function() {
        setReactions(prev => prev.filter(r => r.id !== id))
      }, 2000)
    }
    window.addEventListener('slashdot-app-opened', handler)
    return function() { window.removeEventListener('slashdot-app-opened', handler) }
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 7000 }}>
      {reactions.map(function(r) {
        return (
          <div key={r.id} style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            fontSize: 28,
            animation: 'reactionFloat 2s ease-out forwards',
            userSelect: 'none',
          }}>
            {r.emoji}
          </div>
        )
      })}
    </div>
  )
}