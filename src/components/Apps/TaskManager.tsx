import { useState, useEffect } from 'react'

interface Process {
  pid: number
  name: string
  cpu: number
  mem: number
  status: 'running' | 'sleeping' | 'zombie'
  type: 'app' | 'system' | 'daemon'
}

const STATIC_PROCESSES: Process[] = [
  { pid: 1,    name: 'init',               cpu: 0.0,  mem: 0.1,  status: 'running',  type: 'system' },
  { pid: 2,    name: 'kernel_watchdog',    cpu: 0.0,  mem: 0.2,  status: 'running',  type: 'system' },
  { pid: 108,  name: 'slashdot-wm',        cpu: 1.2,  mem: 8.4,  status: 'running',  type: 'system' },
  { pid: 204,  name: 'particle-daemon',    cpu: 2.1,  mem: 3.2,  status: 'running',  type: 'daemon' },
  { pid: 312,  name: 'anxiety.exe',        cpu: 12.4, mem: 8.3,  status: 'running',  type: 'daemon' },
  { pid: 420,  name: 'procrastination',    cpu: 5.5,  mem: 3.1,  status: 'sleeping', type: 'daemon' },
  { pid: 512,  name: 'vite-dev-server',    cpu: 4.2,  mem: 2.8,  status: 'running',  type: 'system' },
  { pid: 600,  name: 'terminal.sh',        cpu: 0.8,  mem: 4.1,  status: 'running',  type: 'app'    },
  { pid: 714,  name: 'coffee-monitor',     cpu: 2.1,  mem: 1.2,  status: 'sleeping', type: 'daemon' },
  { pid: 820,  name: 'browser-tabs',       cpu: 18.4, mem: 22.3, status: 'running',  type: 'app'    },
  { pid: 916,  name: 'vim',                cpu: 0.0,  mem: 0.8,  status: 'sleeping', type: 'app'    },
  { pid: 1024, name: 'slashdot-ai.app',    cpu: 0.3,  mem: 1.4,  status: 'running',  type: 'app'    },
  { pid: 1337, name: 'hacker.sh',          cpu: 99.9, mem: 0.1,  status: 'running',  type: 'daemon' },
  { pid: 2048, name: 'gravity.app',        cpu: 6.3,  mem: 3.8,  status: 'running',  type: 'app'    },
  { pid: 9999, name: 'exam-stress',        cpu: 99.9, mem: 99.9, status: 'zombie',   type: 'daemon' },
]

export function TaskManagerApp() {
  const [processes, setProcesses] = useState<Process[]>(STATIC_PROCESSES)
  const [sortBy, setSortBy] = useState<'pid' | 'cpu' | 'mem' | 'name'>('cpu')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [filter, setFilter] = useState<'all' | 'app' | 'system' | 'daemon'>('all')
  const [killed, setKilled] = useState<number[]>([])

  // Fluctuate CPU values
  useEffect(() => {
    const t = setInterval(() => {
      setProcesses(prev => prev.map(p => ({
        ...p,
        cpu: p.pid === 9999 ? 99.9 : p.pid === 1337 ? 99.9 :
          Math.max(0, Math.min(50, p.cpu + (Math.random() - 0.5) * 2)),
        mem: p.pid === 9999 ? 99.9 :
          Math.max(0.1, Math.min(30, p.mem + (Math.random() - 0.5) * 0.3)),
      })))
    }, 1500)
    return () => clearInterval(t)
  }, [])

  function kill(pid: number) {
    if (pid === 9999) {
      window.dispatchEvent(new CustomEvent('slashdot-notify', { detail: { message: 'exam-stress cannot be killed. It never can.', type: 'error' } }))
      return
    }
    setKilled(prev => [...prev, pid])
    window.dispatchEvent(new CustomEvent('slashdot-notify', { detail: { message: `Process ${pid} terminated.`, type: 'info' } }))
    setTimeout(() => setKilled(prev => prev.filter(k => k !== pid)), 3000)
  }

  function toggleSort(col: typeof sortBy) {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir('desc') }
  }

  const visible = processes
    .filter(p => filter === 'all' || p.type === filter)
    .sort((a, b) => {
      const v = sortDir === 'asc' ? 1 : -1
      if (sortBy === 'name') return v * a.name.localeCompare(b.name)
      return v * (b[sortBy] - a[sortBy])
    })

  const totalCpu = processes.reduce((s, p) => s + p.cpu, 0)
  const totalMem = processes.reduce((s, p) => s + p.mem, 0)

  const colStyle = (active: boolean) => ({
    cursor: 'pointer' as const,
    color: active ? '#00ff46' : '#555',
    fontFamily: 'JetBrains Mono',
    fontSize: 11,
    fontWeight: 700,
    userSelect: 'none' as const,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>

      {/* Summary bars */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 20 }}>
        {[
          { label: 'CPU', value: Math.min(100, totalCpu / processes.length * 3), color: '#00ff46' },
          { label: 'Memory', value: Math.min(100, totalMem / 2), color: '#00c8ff' },
          { label: 'Processes', value: null, count: processes.length, color: '#ffd700' },
        ].map(item => (
          <div key={item.label} style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{item.label}</span>
              <span style={{ color: item.color, fontFamily: 'JetBrains Mono', fontSize: 10 }}>
                {item.count !== undefined ? item.count : `${Math.round(item.value ?? 0)}%`}
              </span>
            </div>
            {item.value !== null && item.value !== undefined && (
              <div style={{ height: 4, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${item.value}%`, background: item.color, borderRadius: 2, transition: 'width 0.5s' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ padding: '6px 16px', borderBottom: '1px solid #1e1e1e', display: 'flex', gap: 6, alignItems: 'center' }}>
        {(['all', 'app', 'system', 'daemon'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '2px 10px', background: filter === f ? '#00c8ff20' : 'transparent', border: `1px solid ${filter === f ? '#00c8ff' : '#333'}`, borderRadius: 4, color: filter === f ? '#00c8ff' : '#666', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer' }}>
            {f}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{visible.length} processes</span>
      </div>

      {/* Table header */}
      <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 80px 80px 80px 70px', padding: '6px 16px', borderBottom: '1px solid #1e1e1e', gap: 8 }}>
        <span style={colStyle(sortBy === 'pid')} onClick={() => toggleSort('pid')}>PID {sortBy === 'pid' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</span>
        <span style={colStyle(sortBy === 'name')} onClick={() => toggleSort('name')}>Name {sortBy === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</span>
        <span style={colStyle(sortBy === 'cpu')} onClick={() => toggleSort('cpu')}>CPU% {sortBy === 'cpu' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</span>
        <span style={colStyle(sortBy === 'mem')} onClick={() => toggleSort('mem')}>MEM% {sortBy === 'mem' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</span>
        <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Status</span>
        <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11 }}>Action</span>
      </div>

      {/* Process list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {visible.map(p => {
          const isKilled = killed.includes(p.pid)
          const cpuColor = p.cpu > 50 ? '#ff5050' : p.cpu > 20 ? '#ffd700' : '#00ff46'
          const statusColor = p.status === 'running' ? '#00ff46' : p.status === 'zombie' ? '#ff5050' : '#ffd700'
          return (
            <div key={p.pid} style={{
              display: 'grid', gridTemplateColumns: '60px 1fr 80px 80px 80px 70px',
              padding: '5px 16px', gap: 8,
              background: isKilled ? '#ff505010' : 'transparent',
              borderBottom: '1px solid #0d0d0d',
              opacity: isKilled ? 0.4 : 1,
              transition: 'all 0.2s',
            }}>
              <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{p.pid}</span>
              <span style={{ color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
              <span style={{ color: cpuColor, fontFamily: 'JetBrains Mono', fontSize: 11 }}>{Math.round(p.cpu * 10) / 10}%</span>
              <span style={{ color: '#00c8ff', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{Math.round(p.mem * 10) / 10}%</span>
              <span style={{ color: statusColor, fontFamily: 'JetBrains Mono', fontSize: 10 }}>{p.status}</span>
              <button
                onClick={() => kill(p.pid)}
                disabled={isKilled}
                style={{
                  padding: '1px 6px', background: 'transparent',
                  border: '1px solid #ff505040', borderRadius: 3,
                  color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 9,
                  cursor: isKilled ? 'default' : 'pointer', opacity: isKilled ? 0.3 : 1,
                }}>
                Kill
              </button>
            </div>
          )
        })}
      </div>

      <div style={{ padding: '4px 16px', borderTop: '1px solid #1e1e1e', fontFamily: 'JetBrains Mono', fontSize: 10, color: '#333' }}>
        Click column headers to sort • Kill button terminates process
      </div>
    </div>
  )
}