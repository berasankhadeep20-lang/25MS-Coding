import { useState, useRef } from 'react'

interface Note {
  id: number
  title: string
  content: string
  created: string
  modified: string
}

let nextId = 3
const INITIAL_NOTES: Note[] = [
  { id: 1, title: 'Welcome', content: 'Welcome to SlashDot Notepad!\n\nYou can create, edit, and delete notes.\nNotes are saved in your session.\n\nTip: Type "open notepad" in the terminal to open this app.', created: '2026-04-11', modified: '2026-04-11' },
  { id: 2, title: 'TODO', content: '[ ] Submit competition entry\n[ ] Push to GitHub\n[ ] Update README\n[ ] Celebrate\n[x] Build an OS in a browser', created: '2026-04-11', modified: '2026-04-11' },
]

export function NotepadApp() {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES)
  const [activeId, setActiveId] = useState<number>(1)
  const [editing, setEditing] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)

  const active = notes.find(n => n.id === activeId) ?? notes[0]

  function updateContent(content: string) {
    setNotes(prev => prev.map(n =>
      n.id === activeId ? { ...n, content, modified: new Date().toLocaleDateString() } : n
    ))
  }

  function updateTitle(title: string) {
    setNotes(prev => prev.map(n =>
      n.id === activeId ? { ...n, title, modified: new Date().toLocaleDateString() } : n
    ))
  }

  function newNote() {
    const note: Note = {
      id: ++nextId,
      title: 'Untitled',
      content: '',
      created: new Date().toLocaleDateString(),
      modified: new Date().toLocaleDateString(),
    }
    setNotes(prev => [note, ...prev])
    setActiveId(note.id)
    setEditing(true)
    setTimeout(() => titleRef.current?.focus(), 50)
  }

  function deleteNote(id: number) {
    if (notes.length <= 1) return
    setNotes(prev => prev.filter(n => n.id !== id))
    if (activeId === id) setActiveId(notes.find(n => n.id !== id)!.id)
  }

  const wordCount = active?.content.trim().split(/\s+/).filter(Boolean).length ?? 0
  const charCount = active?.content.length ?? 0

  return (
    <div style={{ display: 'flex', height: '100%', background: '#0a0a0a' }}>

      {/* Sidebar */}
      <div style={{ width: 170, borderRight: '1px solid #1e1e1e', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '8px 10px', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700 }}>Notes</span>
          <button onClick={newNote}
            style={{ background: '#00ff4620', border: '1px solid #00ff4640', borderRadius: 4, color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, cursor: 'pointer', padding: '0 6px', lineHeight: '18px' }}>
            +
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {notes.map(note => (
            <div key={note.id}
              onClick={() => { setActiveId(note.id); setEditing(false) }}
              style={{
                padding: '8px 10px', cursor: 'pointer',
                background: activeId === note.id ? '#00ff4610' : 'transparent',
                borderLeft: `2px solid ${activeId === note.id ? '#00ff46' : 'transparent'}`,
                borderBottom: '1px solid #111',
              }}>
              <p style={{ color: activeId === note.id ? '#00ff46' : '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700, margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {note.title}
              </p>
              <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9, margin: 0 }}>{note.modified}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      {active && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '8px 14px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              ref={titleRef}
              value={active.title}
              onChange={e => updateTitle(e.target.value)}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700,
              }}
            />
            <button onClick={() => deleteNote(active.id)}
              style={{ background: 'transparent', border: 'none', color: '#555', cursor: notes.length > 1 ? 'pointer' : 'default', fontSize: 14, opacity: notes.length > 1 ? 1 : 0.3 }}>
              🗑
            </button>
          </div>
          <textarea
            value={active.content}
            onChange={e => updateContent(e.target.value)}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12,
              lineHeight: 1.8, padding: '14px', resize: 'none',
            }}
            placeholder="Start typing..."
          />
          <div style={{ padding: '4px 14px', borderTop: '1px solid #1e1e1e', display: 'flex', gap: 16, fontFamily: 'JetBrains Mono', fontSize: 10, color: '#333' }}>
            <span>{wordCount} words</span>
            <span>{charCount} chars</span>
            <span style={{ marginLeft: 'auto' }}>Modified: {active.modified}</span>
          </div>
        </div>
      )}
    </div>
  )
}