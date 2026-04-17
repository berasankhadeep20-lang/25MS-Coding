import React, { useState, useEffect } from 'react';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  category: 'general' | 'announcements' | 'projects' | 'help' | 'events';
  content: string;
  timestamp: string;
  replies: ForumReply[];
  views: number;
  likes: number;
  pinned: boolean;
}

interface ForumReply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  teamMembers: string[];
  tasks: ProjectTask[];
  status: 'planning' | 'in-progress' | 'completed';
  startDate: string;
  endDate?: string;
  repository?: string;
  image?: string;
}

interface ProjectTask {
  id: string;
  title: string;
  assignedTo: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  type: 'important' | 'event' | 'update' | 'other';
}

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

interface ForumPost {
  id: string;
  title: string;
  author: string;
  category: 'general' | 'announcements' | 'projects' | 'help' | 'events';
  content: string;
  timestamp: string;
  replies: ForumReply[];
  views: number;
  likes: number;
  pinned: boolean;
}

interface ForumReply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  teamMembers: string[];
  tasks: ProjectTask[];
  status: 'planning' | 'in-progress' | 'completed';
  startDate: string;
  endDate?: string;
  repository?: string;
  image?: string;
}

interface ProjectTask {
  id: string;
  title: string;
  assignedTo: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  type: 'important' | 'event' | 'update' | 'other';
}


const CATEGORIES: ForumPost['category'][] = ['general', 'help', 'projects', 'events', 'announcements'];

const inp: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  background: '#0d0d0d',
  border: '1px solid #222',
  borderRadius: 8,
  color: '#d0d0d0',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 12,
  outline: 'none',
  boxSizing: 'border-box',
};

function ClubCommunity() {
  const [activeTab, setActiveTab] = useState<'forum' | 'projects' | 'announcements' | 'events' | 'members'>('forum');
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Forum state
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('general');
  const [newAuthor, setNewAuthor] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');
  const [postError, setPostError] = useState('');
  const [replyError, setReplyError] = useState('');

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedPosts = localStorage.getItem('slashdot-forum-posts');
    const savedProjects = localStorage.getItem('slashdot-projects');
    const savedAnnouncements = localStorage.getItem('slashdot-announcements');
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    else loadDefaultPosts();
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    else loadDefaultProjects();
    if (savedAnnouncements) setAnnouncements(JSON.parse(savedAnnouncements));
    else loadDefaultAnnouncements();
  }, []);

  useEffect(() => {
    if (posts.length > 0)
      localStorage.setItem('slashdot-forum-posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    if (projects.length > 0)
      localStorage.setItem('slashdot-projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (announcements.length > 0)
      localStorage.setItem('slashdot-announcements', JSON.stringify(announcements));
  }, [announcements]);

  // Keep selectedPost in sync when posts update
  useEffect(() => {
    if (selectedPost) {
      const updated = posts.find(p => p.id === selectedPost.id);
      if (updated) setSelectedPost(updated);
    }
  }, [posts]);

  const loadDefaultPosts = () => {
    setPosts([
      {
        id: '1',
        title: 'Welcome to SlashDot Community!',
        author: 'Admin',
        category: 'announcements',
        content: 'Welcome to the SlashDot discussion forum! This is a place to discuss projects, ask questions, share ideas, and collaborate with fellow members.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [
          {
            id: 'r1',
            author: 'Sankhadeep',
            content: 'Excited to have this space! Let\'s make good use of it.',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 4,
          },
        ],
        views: 156,
        likes: 24,
        pinned: true,
      },
      {
        id: '2',
        title: 'How do I set up the dev environment?',
        author: 'Newbie_25MS',
        category: 'help',
        content: 'I am trying to set up the SlashDot OS development environment but getting a blank screen after npm run dev. Anyone faced this before?',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [],
        views: 89,
        likes: 5,
        pinned: false,
      },
      {
        id: '3',
        title: 'HackSlash 2026 — Team formation thread',
        author: 'Anuprovo',
        category: 'events',
        content: 'Looking for teammates for HackSlash 2026! Drop your skills below and find people to team up with. I am strong in backend and ML — looking for a frontend person.',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        replies: [],
        views: 43,
        likes: 11,
        pinned: false,
      },
    ]);
  };

  const loadDefaultProjects = () => {
    setProjects([
      {
        id: 'p1',
        name: 'SlashDot OS Website',
        description: 'Browser-based OS as the official club website — built for Inter-Batch Web Dev Competition 2026.',
        category: 'Web Development',
        teamMembers: ['Sankhadeep', 'S. Bari'],
        tasks: [
          { id: 't1', title: 'Design mockups', assignedTo: 'Sankhadeep', status: 'done', dueDate: '2026-04-10', priority: 'high' },
          { id: 't2', title: 'Terminal emulator', assignedTo: 'S. Bari', status: 'done', dueDate: '2026-04-01', priority: 'high' },
          { id: 't3', title: 'Mobile optimization', assignedTo: 'Sankhadeep', status: 'in-progress', dueDate: '2026-04-17', priority: 'high' },
        ],
        status: 'in-progress',
        startDate: '2026-03-15',
        image: '🖥',
      },
    ]);
  };

  const loadDefaultAnnouncements = () => {
    setAnnouncements([
      {
        id: 'a1',
        title: 'HackSlash 2026 Registration Open!',
        content: 'Registration for HackSlash 2026 is now open. Teams of 2–4. 24 hours. Limited slots available. Register before April 30.',
        author: 'Shuvam (President)',
        timestamp: new Date().toISOString(),
        type: 'important',
      },
      {
        id: 'a2',
        title: 'Welcome 25MS Batch to SlashDot!',
        content: 'The 25MS batch has officially joined SlashDot. Welcome, developers and designers! Your journey starts here.',
        author: 'Admin',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'update',
      },
    ]);
  };

  // ── Forum actions ────────────────────────────────────────────────────────────

  function handleNewPost() {
    setPostError('');
    if (!newTitle.trim()) { setPostError('Title is required.'); return; }
    if (!newContent.trim() || newContent.trim().length < 10) { setPostError('Please write at least 10 characters.'); return; }
    const post: ForumPost = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      author: newAuthor.trim() || 'Anonymous',
      category: newCategory,
      content: newContent.trim(),
      timestamp: new Date().toISOString(),
      replies: [],
      views: 1,
      likes: 0,
      pinned: false,
    };
    setPosts(prev => [post, ...prev]);
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setNewCategory('general');
    setShowNewPost(false);
    // Show the new post immediately
    setSelectedPost(post);
  }

  function handleAddReply(postId: string) {
    setReplyError('');
    if (!replyContent.trim() || replyContent.trim().length < 3) {
      setReplyError('Reply must be at least 3 characters.');
      return;
    }
    const reply: ForumReply = {
      id: Date.now().toString(),
      author: replyAuthor.trim() || 'Anonymous',
      content: replyContent.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
    };
    setPosts(prev =>
      prev.map(p => p.id === postId ? { ...p, replies: [...p.replies, reply] } : p)
    );
    setReplyContent('');
    setReplyAuthor('');
  }

  function handleLikePost(postId: string) {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  }

  function handleOpenPost(post: ForumPost) {
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, views: p.views + 1 } : p));
    setSelectedPost(post);
    setShowNewPost(false);
  }

  // ── Category badge ────────────────────────────────────────────────────────────

  const catColor: Record<string, string> = {
    general: '#00c8ff', help: '#ff5050', projects: '#ffd700',
    events: '#c864ff', announcements: '#00ff46',
  };

  function CatBadge({ cat }: { cat: string }) {
    return (
      <span style={{
        background: (catColor[cat] ?? '#888') + '20',
        color: catColor[cat] ?? '#888',
        fontFamily: 'JetBrains Mono', fontSize: 8,
        padding: '1px 6px', borderRadius: 4, border: `1px solid ${(catColor[cat] ?? '#888')}40`,
      }}>{cat}</span>
    );
  }

  // ── Shared button style ───────────────────────────────────────────────────────

  function Btn({ onClick, children, color = '#00ff46', style = {} }: {
    onClick: () => void; children: React.ReactNode; color?: string; style?: React.CSSProperties;
  }) {
    return (
      <button onClick={onClick} style={{
        padding: '7px 14px', background: color + '18',
        border: `1px solid ${color}60`, borderRadius: 6,
        color, fontFamily: 'JetBrains Mono', fontSize: 11,
        cursor: 'pointer', fontWeight: 700, ...style,
      }}>{children}</button>
    );
  }

  return (
    <div className="app-body" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <p className="app-label cyan">// community.app — SlashDot Hub</p>
      <div className="app-divider" />

      {/* Tab selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap', flexShrink: 0 }}>
        {[
          { key: 'forum',         label: '💬 Forum' },
          { key: 'projects',      label: '🚀 Projects' },
          { key: 'announcements', label: '📢 Announce' },
          { key: 'events',        label: '📅 Events' },
          { key: 'members',       label: '👥 Members' },
        ].map(tab => (
          <button key={tab.key} onClick={() => { setActiveTab(tab.key as any); setSelectedPost(null); setShowNewPost(false); }}
            style={{
              padding: '5px 14px',
              background: activeTab === tab.key ? '#00ff4620' : '#111',
              border: `1px solid ${activeTab === tab.key ? '#00ff46' : '#1e1e1e'}`,
              borderRadius: 6, color: activeTab === tab.key ? '#00ff46' : '#555',
              fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer',
              fontWeight: activeTab === tab.key ? 700 : 400,
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* ── FORUM TAB ── */}
        {activeTab === 'forum' && (
          <div>
            {/* Post detail view */}
            {selectedPost ? (
              <div>
                <button onClick={() => setSelectedPost(null)}
                  style={{ background: 'transparent', border: 'none', color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer', marginBottom: 12, padding: 0 }}>
                  ← Back to Forum
                </button>

                {/* Post header */}
                <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '14px 16px', marginBottom: 12 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                    <CatBadge cat={selectedPost.category} />
                    {selectedPost.pinned && <span style={{ color: '#ffd700', fontSize: 9, fontFamily: 'JetBrains Mono' }}>📌 pinned</span>}
                  </div>
                  <h2 style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.4 }}>
                    {selectedPost.title}
                  </h2>
                  <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, margin: '0 0 12px' }}>
                    by {selectedPost.author} · {formatDate(selectedPost.timestamp)} · 👁 {selectedPost.views} · ❤️ {selectedPost.likes}
                  </p>
                  <p style={{ color: '#ccc', fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.8, margin: '0 0 12px' }}>
                    {selectedPost.content}
                  </p>
                  <button onClick={() => handleLikePost(selectedPost.id)}
                    style={{ background: '#ff505018', border: '1px solid #ff505040', borderRadius: 4, color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 10, cursor: 'pointer', padding: '3px 10px' }}>
                    ❤️ Like ({selectedPost.likes})
                  </button>
                </div>

                {/* Replies */}
                <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 8 }}>
                  {selectedPost.replies.length} {selectedPost.replies.length === 1 ? 'reply' : 'replies'}
                </p>
                {selectedPost.replies.length === 0 && (
                  <p style={{ color: '#333', fontFamily: 'JetBrains Mono', fontSize: 11, marginBottom: 12 }}>
                    No replies yet. Be the first!
                  </p>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                  {selectedPost.replies.map(r => (
                    <div key={r.id} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 14px', borderLeft: '2px solid #00ff4630' }}>
                      <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 700, margin: '0 0 4px' }}>
                        {r.author} <span style={{ color: '#444', fontWeight: 400 }}>· {formatDate(r.timestamp)}</span>
                      </p>
                      <p style={{ color: '#bbb', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.7, margin: 0 }}>
                        {r.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Reply form */}
                <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '14px 16px' }}>
                  <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 10px', fontWeight: 700 }}>
                    ✏ Write a reply
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <input value={replyAuthor} onChange={e => setReplyAuthor(e.target.value)}
                      placeholder="Your name (optional, defaults to Anonymous)"
                      style={inp} />
                    <textarea value={replyContent} onChange={e => setReplyContent(e.target.value)}
                      placeholder="Write your reply here..."
                      rows={3} style={{ ...inp, resize: 'vertical', lineHeight: 1.7 }} />
                    {replyError && (
                      <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>⚠ {replyError}</p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Btn onClick={() => handleAddReply(selectedPost.id)}>↩ Post Reply</Btn>
                    </div>
                  </div>
                </div>
              </div>
            ) : showNewPost ? (
              /* New post form */
              <div style={{ background: '#111', border: '1px solid #00ff4630', borderRadius: 10, padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: 0 }}>
                    ✏ New Post
                  </p>
                  <button onClick={() => { setShowNewPost(false); setPostError(''); }}
                    style={{ background: 'transparent', border: 'none', color: '#555', fontFamily: 'JetBrains Mono', fontSize: 18, cursor: 'pointer', lineHeight: 1 }}>✕</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <label style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, display: 'block', marginBottom: 4 }}>Your Name (optional)</label>
                    <input value={newAuthor} onChange={e => setNewAuthor(e.target.value)}
                      placeholder="Anonymous" style={inp} />
                  </div>
                  <div>
                    <label style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, display: 'block', marginBottom: 4 }}>Category *</label>
                    <select value={newCategory} onChange={e => setNewCategory(e.target.value as ForumPost['category'])}
                      style={{ ...inp, cursor: 'pointer' }}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, display: 'block', marginBottom: 4 }}>Title *</label>
                    <input value={newTitle} onChange={e => setNewTitle(e.target.value)}
                      placeholder="What's on your mind?" style={inp} />
                  </div>
                  <div>
                    <label style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, display: 'block', marginBottom: 4 }}>
                      Post Content * <span style={{ color: '#333' }}>({newContent.length}/1000)</span>
                    </label>
                    <textarea value={newContent} onChange={e => setNewContent(e.target.value.slice(0, 1000))}
                      placeholder="Share your thoughts, questions, or ideas..." rows={5}
                      style={{ ...inp, resize: 'vertical', lineHeight: 1.7 }} />
                  </div>
                  {postError && (
                    <p style={{ color: '#ff5050', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>⚠ {postError}</p>
                  )}
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button onClick={() => { setShowNewPost(false); setPostError(''); }}
                      style={{ padding: '7px 14px', background: 'transparent', border: '1px solid #333', borderRadius: 6, color: '#555', fontFamily: 'JetBrains Mono', fontSize: 11, cursor: 'pointer' }}>
                      Cancel
                    </button>
                    <Btn onClick={handleNewPost}>📤 Post</Btn>
                  </div>
                </div>
              </div>
            ) : (
              /* Post list */
              <div>
                {/* Toolbar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                  </p>
                  <Btn onClick={() => setShowNewPost(true)}>+ New Post</Btn>
                </div>

                {posts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '30px 0' }}>
                    <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 12, marginBottom: 12 }}>
                      No posts yet. Start the conversation!
                    </p>
                    <Btn onClick={() => setShowNewPost(true)}>✏ Write the first post</Btn>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {posts.map(post => (
                      <div key={post.id}
                        onClick={() => handleOpenPost(post)}
                        style={{
                          background: '#111', border: '1px solid #1e1e1e', borderRadius: 8,
                          padding: '12px 14px', cursor: 'pointer', transition: 'border-color 0.15s',
                          borderLeft: post.pinned ? '3px solid #ffd70060' : '1px solid #1e1e1e',
                        }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#00ff4640'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = post.pinned ? '#ffd70060' : '#1e1e1e'}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5, flexWrap: 'wrap', gap: 4 }}>
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                            <CatBadge cat={post.category} />
                            {post.pinned && <span style={{ color: '#ffd700', fontSize: 9, fontFamily: 'JetBrains Mono' }}>📌</span>}
                          </div>
                          <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9 }}>
                            {formatDate(post.timestamp)}
                          </span>
                        </div>
                        <p style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: '0 0 4px', lineHeight: 1.4 }}>
                          {post.title}
                        </p>
                        <p style={{ color: '#777', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 8px', lineHeight: 1.5 }}>
                          {post.content.length > 120 ? post.content.slice(0, 120) + '...' : post.content}
                        </p>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9 }}>by {post.author}</span>
                          <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9 }}>💬 {post.replies.length}</span>
                          <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9 }}>👁 {post.views}</span>
                          <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9 }}>❤️ {post.likes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── PROJECTS TAB ── */}
        {activeTab === 'projects' && (
          <div>
            <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>
              Active club projects — {projects.length} total
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
              {projects.length === 0 ? (
                <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 11 }}>No projects yet.</p>
              ) : (
                projects.map(p => {
                  const done = p.tasks.filter(t => t.status === 'done').length;
                  const pct = p.tasks.length ? Math.round((done / p.tasks.length) * 100) : 0;
                  return (
                    <div key={p.id} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '14px' }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>{p.image || '📁'}</div>
                      <h3 style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: '0 0 6px' }}>
                        {p.name}
                      </h3>
                      <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 10, lineHeight: 1.5, margin: '0 0 10px' }}>
                        {p.description}
                      </p>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
                        {p.teamMembers.map((m, i) => (
                          <span key={i} style={{ background: '#00ff4615', color: '#00ff46', padding: '2px 8px', borderRadius: 4, fontSize: 9, fontFamily: 'JetBrains Mono' }}>
                            {m}
                          </span>
                        ))}
                      </div>
                      {/* Progress bar */}
                      <div style={{ marginBottom: 6 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9 }}>Progress</span>
                          <span style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 9 }}>{done}/{p.tasks.length} tasks</span>
                        </div>
                        <div style={{ height: 4, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: '#00ff46', borderRadius: 2 }} />
                        </div>
                      </div>
                      <span style={{ color: p.status === 'completed' ? '#00ff46' : p.status === 'in-progress' ? '#ffd700' : '#555', fontFamily: 'JetBrains Mono', fontSize: 9 }}>
                        ● {p.status}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ── ANNOUNCEMENTS TAB ── */}
        {activeTab === 'announcements' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 4px' }}>
              Official announcements from SlashDot OBs
            </p>
            {announcements.length === 0 ? (
              <p style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 11 }}>No announcements yet.</p>
            ) : (
              announcements.map(a => {
                const typeColor: Record<string, string> = { important: '#ff5050', event: '#c864ff', update: '#00c8ff', other: '#888' };
                return (
                  <div key={a.id} style={{ background: '#111', border: `1px solid ${typeColor[a.type] ?? '#555'}30`, borderLeft: `3px solid ${typeColor[a.type] ?? '#555'}`, borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <h3 style={{ color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: 0 }}>
                        {a.title}
                      </h3>
                      <span style={{ color: typeColor[a.type], fontFamily: 'JetBrains Mono', fontSize: 8, padding: '1px 6px', border: `1px solid ${typeColor[a.type]}40`, borderRadius: 4 }}>
                        {a.type}
                      </span>
                    </div>
                    <p style={{ color: '#aaa', fontFamily: 'JetBrains Mono', fontSize: 11, lineHeight: 1.7, margin: '0 0 8px' }}>
                      {a.content}
                    </p>
                    <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 9 }}>
                      by {a.author} · {formatDate(a.timestamp)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── EVENTS TAB ── */}
        {activeTab === 'events' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, margin: '0 0 4px' }}>
              Upcoming SlashDot events
            </p>
            {[
              { id: 'e1', name: 'Weekly Club Meeting',  date: '2026-04-18', time: '18:00', location: 'LHC G01',       color: '#00c8ff' },
              { id: 'e2', name: 'HackSlash 2026',       date: '2026-05-10', time: '09:00', location: 'LHC Main Hall', color: '#ff5050' },
              { id: 'e3', name: 'Web Dev Workshop',     date: '2026-04-25', time: '17:00', location: 'LHC G05',       color: '#ffd700' },
              { id: 'e4', name: 'Open Source Drive',    date: '2026-05-15', time: '15:00', location: 'CS Block',      color: '#c864ff' },
            ].map(event => {
              const isPast = new Date(event.date) < new Date();
              return (
                <div key={event.id} style={{ background: '#111', border: `1px solid ${event.color}30`, borderLeft: `3px solid ${isPast ? '#333' : event.color}`, borderRadius: 8, padding: '12px 14px', opacity: isPast ? 0.5 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <h3 style={{ color: isPast ? '#555' : event.color, fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 700, margin: 0 }}>
                      {event.name}
                    </h3>
                    {isPast && <span style={{ color: '#444', fontFamily: 'JetBrains Mono', fontSize: 8 }}>completed</span>}
                  </div>
                  <p style={{ color: '#888', fontFamily: 'JetBrains Mono', fontSize: 10, margin: 0 }}>
                    🕐 {event.time} · 📍 {event.location} · 📅 {event.date}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* ── MEMBERS TAB ── */}
        {activeTab === 'members' && (
          <div>
            <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 10, marginBottom: 12 }}>
              Core team — type <span style={{ color: '#00ff46' }}>open memberlist</span> for the full 24-member list
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
              {[
                { name: 'Shuvam Banerji Seal', batch: '22MS', role: 'President',       avatar: '👨‍🎓' },
                { name: 'Anuprovo Debnath',    batch: '23MS', role: 'Secretary',       avatar: '📝' },
                { name: 'Abhinav Dhingra',     batch: '24MS', role: 'Treasurer',       avatar: '💰' },
                { name: 'Sankhadeep Bera',     batch: '25MS', role: 'Lead Developer',  avatar: '👨‍💻' },
                { name: 'S. Bari',             batch: '25MS', role: 'Systems Dev',     avatar: '⚙' },
              ].map((m, i) => (
                <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{m.avatar}</div>
                  <p style={{ color: '#00ff46', fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 700, margin: '0 0 4px', lineHeight: 1.3 }}>
                    {m.name}
                  </p>
                  <p style={{ color: '#555', fontFamily: 'JetBrains Mono', fontSize: 9, margin: 0 }}>
                    {m.batch} · {m.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ClubCommunity;