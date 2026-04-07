import { useState } from 'react'

interface FSNode {
  name: string
  type: 'dir' | 'file'
  size?: string
  modified?: string
  content?: string
  children?: FSNode[]
}

const FS: FSNode = {
  name: '/',
  type: 'dir',
  children: [
    {
      name: 'home',
      type: 'dir',
      children: [
        {
          name: 'slashdot',
          type: 'dir',
          children: [
            { name: 'about.txt',   type: 'file', size: '1.2 KB', modified: '2026-04-11', content: 'SlashDot is the official coding and designing club of IISER Kolkata.\n\nWe explore programming, design, web development,\ncompetitive coding, open source, and everything in between.' },
            { name: 'README.md',   type: 'file', size: '8.4 KB', modified: '2026-04-11', content: '# SlashDot OS\n\nA browser-based OS simulator.\nBuilt by the 25MS batch for the Inter-Batch Competition 2026.\n\nType "help" in the terminal to get started.' },
            { name: 'contact.sh',  type: 'file', size: '0.3 KB', modified: '2026-04-11', content: '#!/bin/bash\necho "Email: slashdot@iiserkol.ac.in"\necho "GitHub: github.com/slashdot-iiserk"\necho "Website: slashdot-iiserk.github.io"' },
            { name: '.secrets',    type: 'file', size: '0.1 KB', modified: '2026-04-11', content: 'Permission denied.\n\n(some things are better left unknown)' },
            {
              name: 'projects',
              type: 'dir',
              children: [
                { name: 'slashdot-os.zip',     type: 'file', size: '2.1 MB', modified: '2026-04-11', content: 'Binary file — cannot display.' },
                { name: 'fourier-viz.ts',       type: 'file', size: '4.2 KB', modified: '2026-04-10', content: '// Fourier Transform Visualizer\n// See the fourier app for the full implementation.' },
                { name: 'gravity-sim.ts',       type: 'file', size: '3.8 KB', modified: '2026-04-10', content: '// N-Body Gravity Simulator\n// See the gravity app for the full implementation.' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'etc',
      type: 'dir',
      children: [
        { name: 'os-release',  type: 'file', size: '0.2 KB', modified: '2026-04-11', content: 'NAME="SlashDot OS"\nVERSION="2026.1.0"\nID=slashdot\nHOME_URL="https://slashdot-iiserk.github.io"\nBUILD_BY="25MS Batch, IISER Kolkata"' },
        { name: 'passwd',      type: 'file', size: '0.3 KB', modified: '2026-04-11', content: 'root:x:0:0:root:/root:/bin/bash\nslashdot:x:1000:1000:SlashDot:/home/slashdot:/bin/slashdot-sh\nsankhadeep:x:1001:1001:Sankhadeep Bera:/home/sankhadeep:/bin/bash\nexam_stress:x:9999:9999:unkillable:/proc/9999:/bin/panic' },
        { name: 'hostname',    type: 'file', size: '0.1 KB', modified: '2026-04-11', content: 'slashdot-os.iiserkol.ac.in' },
      ],
    },
    {
      name: 'usr',
      type: 'dir',
      children: [
        {
          name: 'bin',
          type: 'dir',
          children: [
            { name: 'terminal',   type: 'file', size: '128 KB', modified: '2026-04-11', content: 'Binary executable — SlashDot Terminal v2026' },
            { name: 'neofetch',   type: 'file', size: '12 KB',  modified: '2026-04-11', content: 'Binary executable — neofetch system info tool' },
            { name: 'vim',        type: 'file', size: '8 KB',   modified: '2026-04-11', content: 'Binary executable — fake vim editor' },
          ],
        },
      ],
    },
    {
      name: 'var',
      type: 'dir',
      children: [
        {
          name: 'log',
          type: 'dir',
          children: [
            { name: 'boot.log',   type: 'file', size: '2.1 KB', modified: '2026-04-11', content: '[0.000] SlashDot OS booting...\n[0.142] Loading club modules...\n[0.380] Mounting initramfs...\n[0.612] Starting RISC-V emulator...\n[1.780] Boot complete.' },
            { name: 'bugs.log',   type: 'file', size: '9.9 KB', modified: '2026-04-11', content: 'ERROR: undefined is not a function\nERROR: Cannot read properties of null\nWARN: This is fine\nERROR: Works on my machine\n... (999 more errors)' },
            { name: 'wifi.log',   type: 'file', size: '0.1 KB', modified: '2026-04-11', content: 'Connecting...\nConnecting...\nConnecting...\nTimeout.\n(as always)' },
          ],
        },
      ],
    },
  ],
}

function getNode(path: string[]): FSNode | null {
  let node: FSNode = FS
  for (const part of path) {
    if (!node.children) return null
    const found = node.children.find(c => c.name === part)
    if (!found) return null
    node = found
  }
  return node
}

export function FileExplorerApp() {
  const [path, setPath] = useState<string[]>([])
  const [selected, setSelected] = useState<FSNode | null>(null)
  const [preview, setPreview] = useState<FSNode | null>(null)

  const current = getNode(path)
  const children = current?.children ?? []

  function navigate(name: string) {
    const node = children.find(c => c.name === name)
    if (!node) return
    if (node.type === 'dir') {
      setPath([...path, name])
      setSelected(null)
      setPreview(null)
    } else {
      setSelected(node)
      setPreview(node)
    }
  }

  function goUp() {
    setPath(path.slice(0, -1))
    setSelected(null)
    setPreview(null)
  }

  const fullPath = '/' + path.join('/')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a' }}>

      {/* Toolbar */}
      <div style={{ padding: '6px 16px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={goUp} disabled={path.length === 0}
          style={{ padding: '2px 10px', background: 'transparent', border: '1px solid #222', borderRadius: 4, color: path.length === 0 ? '#333' : '#888', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: path.length === 0 ? 'default' : 'pointer' }}>
          ← Up
        </button>
        <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, flex: 1 }}>{fullPath || '/'}</span>
        <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{children.length} items</span>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* File list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          {children.length === 0 && (
            <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 12, padding: '12px' }}>Empty directory</p>
          )}
          {children.map(function(node) {
            const isSelected = selected?.name === node.name
            return (
              <div
                key={node.name}
                onDoubleClick={function() { navigate(node.name) }}
                onClick={function() { setSelected(node); if (node.type === 'file') setPreview(node) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '6px 10px', borderRadius: 6, cursor: 'pointer',
                  background: isSelected ? '#00ff4615' : 'transparent',
                  border: `1px solid ${isSelected ? '#00ff4630' : 'transparent'}`,
                  marginBottom: 2, transition: 'all 0.08s',
                }}
              >
                <span style={{ fontSize: 16 }}>{node.type === 'dir' ? '📁' : '📄'}</span>
                <span style={{ flex: 1, color: node.type === 'dir' ? '#00c8ff' : '#d0d0d0', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{node.name}</span>
                {node.size && <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{node.size}</span>}
                {node.modified && <span style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{node.modified}</span>}
              </div>
            )
          })}
        </div>

        {/* Preview pane */}
        {preview && preview.type === 'file' && (
          <div style={{ width: 220, borderLeft: '1px solid #1e1e1e', padding: '12px', overflowY: 'auto' }}>
            <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700, marginBottom: 8 }}>{preview.name}</p>
            {preview.size && <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 4 }}>Size: {preview.size}</p>}
            {preview.modified && <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 10 }}>Modified: {preview.modified}</p>}
            <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: 10 }}>
              <pre style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 10, lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>
                {preview.content}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div style={{ padding: '3px 16px', borderTop: '1px solid #1e1e1e', display: 'flex', gap: 16, fontFamily: 'JetBrains Mono', fontSize: 10, color: '#333' }}>
        <span>Double-click to open</span>
        {selected && <span style={{ color: '#555' }}>Selected: {selected.name}</span>}
      </div>
    </div>
  )
}