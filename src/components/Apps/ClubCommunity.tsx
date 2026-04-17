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

const ClubCommunity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forum' | 'projects' | 'announcements' | 'events' | 'members'>('forum');
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [userName] = useState('User');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive design
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
    localStorage.setItem('slashdot-forum-posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('slashdot-projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('slashdot-announcements', JSON.stringify(announcements));
  }, [announcements]);

  const loadDefaultPosts = () => {
    setPosts([
      {
        id: '1',
        title: 'Welcome to SlashDot Community!',
        author: 'Admin',
        category: 'announcements',
        content: 'Welcome to the SlashDot discussion forum! This is a place to discuss projects, ask questions, and collaborate.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [],
        views: 156,
        likes: 24,
        pinned: true,
      },
      {
        id: '2',
        title: 'How to set up development?',
        author: 'Newbie',
        category: 'help',
        content: 'I am trying to set up the development environment but getting errors. Can anyone help?',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [],
        views: 89,
        likes: 12,
        pinned: false,
      },
    ]);
  };

  const loadDefaultProjects = () => {
    setProjects([
      {
        id: 'p1',
        name: 'SlashDot Website Redesign',
        description: 'Complete redesign of the club website with modern UI/UX',
        category: 'Web Development',
        teamMembers: ['Sankhadeep', 'S. Bari', 'Member 1'],
        tasks: [
          {
            id: 't1',
            title: 'Design mockups',
            assignedTo: 'Sankhadeep',
            status: 'done',
            dueDate: '2026-04-10',
            priority: 'high',
          },
          {
            id: 't2',
            title: 'Frontend implementation',
            assignedTo: 'S. Bari',
            status: 'in-progress',
            dueDate: '2026-05-01',
            priority: 'high',
          },
        ],
        status: 'in-progress',
        startDate: '2026-03-15',
        image: '🎨',
      },
    ]);
  };

  const loadDefaultAnnouncements = () => {
    setAnnouncements([
      {
        id: 'a1',
        title: 'HackSlash 2026 Registration Open!',
        content: 'Registration for HackSlash 2026 is now open. Limited slots available!',
        author: 'Admin',
        timestamp: new Date().toISOString(),
        type: 'important',
      },
    ]);
  };

  const handleNewPost = (title: string, content: string, category: ForumPost['category']) => {
    const newPost: ForumPost = {
      id: Date.now().toString(),
      title,
      author: userName,
      category,
      content,
      timestamp: new Date().toISOString(),
      replies: [],
      views: 1,
      likes: 0,
      pinned: false,
    };
    setPosts([newPost, ...posts]);
  };

  const handleAddReply = (postId: string, replyContent: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [
              ...post.replies,
              {
                id: Date.now().toString(),
                author: userName,
                content: replyContent,
                timestamp: new Date().toISOString(),
                likes: 0,
              },
            ],
          };
        }
        return post;
      })
    );
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)));
  };

  const handleViewPost = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, views: post.views + 1 } : post)));
  };

  const handleUpdateTaskStatus = (projectId: string, taskId: string, newStatus: ProjectTask['status']) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
          };
        }
        return project;
      })
    );
  };

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

  const containerStyle: React.CSSProperties = {
    padding: isMobile ? '15px' : '20px',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    minHeight: '100vh',
    fontFamily: 'JetBrains Mono, monospace',
  };

  const forumContainerStyle: React.CSSProperties = {
    display: isMobile ? 'block' : 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 400px',
    gap: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={styles.header}>
        <h1 style={styles.title}>🌐 SlashDot Community Hub</h1>
        <div style={{
          ...styles.tabButtons,
          fontSize: isMobile ? '12px' : '14px',
          gap: isMobile ? '8px' : '10px',
        }}>
          {[
            { key: 'forum', label: '💬 Forum' },
            { key: 'projects', label: '🚀 Projects' },
            { key: 'announcements', label: '📢 Announce' },
            { key: 'events', label: '📅 Events' },
            { key: 'members', label: '👥 Members' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                ...styles.tabButton,
                ...(activeTab === tab.key ? styles.tabButtonActive : {}),
                flex: isMobile ? 1 : undefined,
                minWidth: isMobile ? '60px' : 'auto',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.content}>
        {activeTab === 'forum' && (
          <ForumSection
            posts={posts}
            onNewPost={handleNewPost}
            onViewPost={handleViewPost}
            onLikePost={handleLikePost}
            onAddReply={handleAddReply}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
            userName={userName}
            formatDate={formatDate}
            isMobile={isMobile}
          />
        )}
        {activeTab === 'projects' && (
          <ProjectsSection
            projects={projects}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            formatDate={formatDate}
            isMobile={isMobile}
          />
        )}
        {activeTab === 'announcements' && <AnnouncementsSection announcements={announcements} formatDate={formatDate} />}
        {activeTab === 'events' && <EventsSection />}
        {activeTab === 'members' && <MembersSection isMobile={isMobile} />}
      </div>
    </div>
  );
};

const ForumSection: React.FC<{
  posts: ForumPost[];
  onNewPost: (title: string, content: string, category: ForumPost['category']) => void;
  onViewPost: (postId: string) => void;
  onLikePost: (postId: string) => void;
  onAddReply: (postId: string, content: string) => void;
  selectedPost: ForumPost | null;
  setSelectedPost: (post: ForumPost | null) => void;
  userName: string;
  formatDate: (date: string) => string;
  isMobile: boolean;
}> = ({
  posts,
  onNewPost,
  onViewPost,
  onLikePost,
  onAddReply,
  selectedPost,
  setSelectedPost,
  userName,
  formatDate,
  isMobile,
}) => {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<ForumPost['category']>('general');
  const [replyContent, setReplyContent] = useState('');

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      onNewPost(newPostTitle, newPostContent, newPostCategory);
      setNewPostTitle('');
      setNewPostContent('');
    }
  };

  const handleReply = () => {
    if (selectedPost && replyContent.trim()) {
      onAddReply(selectedPost.id, replyContent);
      setReplyContent('');
    }
  };

  return (
    <div style={styles.section}>
      <div style={{
        display: isMobile ? 'block' : 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 400px',
        gap: '20px',
      }}>
        <div>
          <h2>💬 Discussion Forum</h2>

          <div style={styles.newPostForm}>
            <h3>Create New Post</h3>
            <input
              type="text"
              placeholder="Post Title..."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="Share your thoughts..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              style={styles.textarea}
            />
            <div style={styles.formRow}>
              <select
                value={newPostCategory}
                onChange={(e) => setNewPostCategory(e.target.value as ForumPost['category'])}
                style={styles.select}
              >
                <option value="general">General</option>
                <option value="announcements">Announcements</option>
                <option value="projects">Projects</option>
                <option value="help">Help</option>
                <option value="events">Events</option>
              </select>
              <button onClick={handleCreatePost} style={styles.button}>
                Post
              </button>
            </div>
          </div>

          <div>
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  setSelectedPost(post);
                  onViewPost(post.id);
                }}
                style={{
                  ...styles.postCard,
                  cursor: 'pointer',
                  opacity: selectedPost?.id === post.id ? 0.8 : 1,
                }}
              >
                <div style={styles.postHeader}>
                  <h4 style={styles.postTitle}>{post.title}</h4>
                  <span style={styles.postCategory}>{post.category}</span>
                </div>
                <p style={styles.postMeta}>
                  by {post.author} • {formatDate(post.timestamp)} • 👁️ {post.views} • ❤️ {post.likes}
                </p>
              </div>
            ))}
          </div>
        </div>

        {!isMobile && selectedPost && (
          <div style={styles.forumRight}>
            <button onClick={() => setSelectedPost(null)} style={styles.closeButton}>
              ✕
            </button>
            <div style={styles.postDetail}>
              <h2>{selectedPost.title}</h2>
              <div style={styles.postContent}>{selectedPost.content}</div>

              <button onClick={() => onLikePost(selectedPost.id)} style={styles.likeButton}>
                ❤️ Like
              </button>

              <div style={styles.repliesSection}>
                <h3>Replies ({selectedPost.replies.length})</h3>
                {selectedPost.replies.map((reply) => (
                  <div key={reply.id} style={styles.replyCard}>
                    <strong>{reply.author}</strong> • {formatDate(reply.timestamp)}
                    <p>{reply.content}</p>
                  </div>
                ))}

                <div style={styles.newReplyForm}>
                  <textarea
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    style={styles.textarea}
                  />
                  <button onClick={handleReply} style={styles.button}>
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isMobile && selectedPost && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => setSelectedPost(null)} style={styles.closeButton}>
              ← Back
            </button>
            <div style={styles.postDetail}>
              <h2>{selectedPost.title}</h2>
              <div style={styles.postContent}>{selectedPost.content}</div>

              <button onClick={() => onLikePost(selectedPost.id)} style={styles.likeButton}>
                ❤️ Like
              </button>

              <div style={styles.repliesSection}>
                <h3>Replies ({selectedPost.replies.length})</h3>
                {selectedPost.replies.map((reply) => (
                  <div key={reply.id} style={styles.replyCard}>
                    <strong>{reply.author}</strong> • {formatDate(reply.timestamp)}
                    <p>{reply.content}</p>
                  </div>
                ))}

                <div style={styles.newReplyForm}>
                  <textarea
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    style={styles.textarea}
                  />
                  <button onClick={handleReply} style={styles.button}>
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectsSection: React.FC<{
  projects: Project[];
  onUpdateTaskStatus: (projectId: string, taskId: string, newStatus: ProjectTask['status']) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  formatDate: (date: string) => string;
  isMobile: boolean;
}> = ({ projects, onUpdateTaskStatus, selectedProject, setSelectedProject, formatDate, isMobile }) => {
  return (
    <div style={styles.section}>
      <h2>🚀 Project Collaboration</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
      }}>
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            style={{
              ...styles.projectCard,
              cursor: 'pointer',
              opacity: selectedProject?.id === project.id ? 0.9 : 1,
            }}
          >
            <div style={styles.projectEmoji}>{project.image || '📁'}</div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div style={styles.projectStatus}>
              ✅ {project.tasks.filter((t) => t.status === 'done').length}/{project.tasks.length} tasks
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div style={styles.projectDetail}>
          <button onClick={() => setSelectedProject(null)} style={styles.closeButton}>
            ✕
          </button>
          <h2>{selectedProject.name}</h2>
          <p>{selectedProject.description}</p>

          <div style={styles.teamMembers}>
            <strong>Team:</strong>
            {selectedProject.teamMembers.map((member, idx) => (
              <span key={idx} style={styles.memberTag}>
                {member}
              </span>
            ))}
          </div>

          <h3>Tasks</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}>
            {(['todo', 'in-progress', 'review', 'done'] as const).map((status) => (
              <div key={status} style={styles.kanbanColumn}>
                <h4>
                  {status === 'todo'
                    ? '📋 To Do'
                    : status === 'in-progress'
                    ? '🔄 In Progress'
                    : status === 'review'
                    ? '👀 Review'
                    : '✅ Done'}
                </h4>
                {selectedProject.tasks
                  .filter((t) => t.status === status)
                  .map((task) => (
                    <div key={task.id} style={styles.taskCard}>
                      <h5>{task.title}</h5>
                      <p style={styles.taskMeta}>👤 {task.assignedTo} • 📅 {formatDate(task.dueDate)}</p>
                      <select
                        value={task.status}
                        onChange={(e) =>
                          onUpdateTaskStatus(
                            selectedProject.id,
                            task.id,
                            e.target.value as ProjectTask['status']
                          )
                        }
                        style={styles.taskSelect}
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AnnouncementsSection: React.FC<{
  announcements: Announcement[];
  formatDate: (date: string) => string;
}> = ({ announcements, formatDate }) => {
  return (
    <div style={styles.section}>
      <h2>📢 Announcements</h2>
      <div>
        {announcements.map((announcement) => (
          <div key={announcement.id} style={styles.announcementCard}>
            <h3>{announcement.title}</h3>
            <p>{announcement.content}</p>
            <small>By {announcement.author} • {formatDate(announcement.timestamp)}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

const EventsSection: React.FC = () => {
  const events = [
    { id: 'e1', name: 'Weekly Club Meeting', date: '2026-04-18', time: '18:00', location: 'LHC G01' },
    { id: 'e2', name: 'HackSlash 2026', date: '2026-05-10', time: '09:00', location: 'LHC Main Hall' },
  ];

  return (
    <div style={styles.section}>
      <h2>📅 Upcoming Events</h2>
      <div>
        {events.map((event) => (
          <div key={event.id} style={styles.eventCard}>
            <h3>{event.name}</h3>
            <p>🕐 {event.time} • 📍 {event.location} • 📅 {event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const MembersSection: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const members = [
    { id: '1', name: 'Sankhadeep Bera', batch: '25MS', role: 'Lead Developer', avatar: '👨‍💻' },
    { id: '2', name: 'S. Bari', batch: '25MS', role: 'Systems Developer', avatar: '👨‍🔧' },
    { id: '3', name: 'Shuvam Banerji Seal', batch: '22MS', role: 'President', avatar: '👨‍🎓' },
  ];

  return (
    <div style={styles.section}>
      <h2>👥 Club Members</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
      }}>
        {members.map((member) => (
          <div key={member.id} style={styles.memberCard}>
            <div style={styles.memberAvatar}>{member.avatar}</div>
            <h3>{member.name}</h3>
            <p>{member.batch} �� {member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  header: {
    marginBottom: '30px',
    borderBottom: '2px solid #00d4ff',
    paddingBottom: '20px',
  } as React.CSSProperties,
  title: { fontSize: '2rem', margin: '0 0 20px 0', color: '#00d4ff' } as React.CSSProperties,
  tabButtons: { display: 'flex', flexWrap: 'wrap' as const } as React.CSSProperties,
  tabButton: {
    padding: '10px 15px',
    backgroundColor: '#0f3460',
    color: '#fff',
    border: '1px solid #00d4ff',
    borderRadius: '4px',
    cursor: 'pointer',
  } as React.CSSProperties,
  tabButtonActive: { backgroundColor: '#00d4ff', color: '#000' } as React.CSSProperties,
  content: { marginTop: '20px' } as React.CSSProperties,
  section: { backgroundColor: '#16213e', padding: '20px', borderRadius: '8px', marginBottom: '20px' } as React.CSSProperties,
  newPostForm: { backgroundColor: '#0f3460', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '2px solid #00d4ff' } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#16213e',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: '4px',
    fontFamily: 'JetBrains Mono, monospace',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#16213e',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: '4px',
    fontFamily: 'JetBrains Mono, monospace',
    minHeight: '100px',
    resize: 'vertical',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  select: {
    padding: '10px',
    marginRight: '10px',
    backgroundColor: '#16213e',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: '4px',
    fontFamily: 'JetBrains Mono, monospace',
    flex: 1,
  } as React.CSSProperties,
  formRow: { display: 'flex', gap: '10px' } as React.CSSProperties,
  button: {
    padding: '10px 20px',
    backgroundColor: '#00d4ff',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  } as React.CSSProperties,
  postCard: { backgroundColor: '#0f3460', padding: '15px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #444' } as React.CSSProperties,
  postHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } as React.CSSProperties,
  postTitle: { margin: 0, fontSize: '16px', color: '#00d4ff' } as React.CSSProperties,
  postCategory: { backgroundColor: '#00d4ff', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' } as React.CSSProperties,
  postMeta: { margin: 0, fontSize: '12px', color: '#aaa' } as React.CSSProperties,
  postDetail: { padding: '10px' } as React.CSSProperties,
  postContent: { backgroundColor: '#16213e', padding: '15px', borderRadius: '4px', marginBottom: '15px', lineHeight: '1.6', whiteSpace: 'pre-wrap' } as React.CSSProperties,
  likeButton: { width: '100%', padding: '10px', marginBottom: '20px', backgroundColor: '#cc0000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' } as React.CSSProperties,
  repliesSection: { marginTop: '20px', borderTop: '1px solid #444', paddingTop: '20px' } as React.CSSProperties,
  replyCard: { backgroundColor: '#16213e', padding: '12px', marginBottom: '12px', borderRadius: '4px', borderLeft: '3px solid #00d4ff' } as React.CSSProperties,
  newReplyForm: { marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #444' } as React.CSSProperties,
  closeButton: { padding: '5px 10px', backgroundColor: '#cc0000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '10px' } as React.CSSProperties,
  forumRight: { backgroundColor: '#0f3460', padding: '20px', borderRadius: '8px', maxHeight: '70vh', overflowY: 'auto' } as React.CSSProperties,
  projectsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' } as React.CSSProperties,
  projectCard: { backgroundColor: '#0f3460', padding: '20px', borderRadius: '8px', border: '1px solid #444' } as React.CSSProperties,
  projectEmoji: { fontSize: '40px', marginBottom: '10px' } as React.CSSProperties,
  projectStatus: { fontSize: '13px', color: '#00d4ff', fontWeight: 'bold' } as React.CSSProperties,
  projectDetail: { backgroundColor: '#0f3460', padding: '30px', borderRadius: '8px', marginTop: '20px', position: 'relative' } as React.CSSProperties,
  teamMembers: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' } as React.CSSProperties,
  memberTag: { backgroundColor: '#00d4ff', color: '#000', padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' } as React.CSSProperties,
  kanbanBoard: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' } as React.CSSProperties,
  kanbanColumn: { backgroundColor: '#16213e', padding: '15px', borderRadius: '8px' } as React.CSSProperties,
  taskCard: { backgroundColor: '#0f3460', padding: '12px', borderRadius: '4px', marginBottom: '10px', border: '1px solid #444' } as React.CSSProperties,
  taskMeta: { fontSize: '12px', color: '#aaa', margin: '8px 0' } as React.CSSProperties,
  taskSelect: { width: '100%', padding: '5px', marginTop: '8px', backgroundColor: '#16213e', color: '#fff', border: '1px solid #444', borderRadius: '4px', fontSize: '11px' } as React.CSSProperties,
  announcementCard: { backgroundColor: '#0f3460', padding: '20px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #444', borderLeft: '4px solid #00d4ff' } as React.CSSProperties,
  eventCard: { backgroundColor: '#0f3460', padding: '20px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #444' } as React.CSSProperties,
  membersGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' } as React.CSSProperties,
  memberCard: { backgroundColor: '#0f3460', padding: '20px', borderRadius: '8px', border: '1px solid #444', textAlign: 'center' as const } as React.CSSProperties,
  memberAvatar: { fontSize: '50px', marginBottom: '10px' } as React.CSSProperties,
};

export default ClubCommunity;