import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Plus, MessageSquare, Trash2, Search, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: Date;
}

const AIChat: React.FC = () => {
  const { user } = useApp();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isTyping]);

  // Create initial session if none exist
  useEffect(() => {
    if (sessions.length === 0) {
      const newSession: ChatSession = {
        id: '1',
        title: 'New Chat',
        messages: [
          {
            id: 'm1',
            role: 'assistant',
            content: `Hello ${user?.name || 'there'}! I'm your AI learning assistant. How can I help you today?`,
            timestamp: new Date()
          }
        ],
        updatedAt: new Date()
      };
      setSessions([newSession]);
      setActiveSessionId('1');
    }
  }, [user]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !activeSessionId) return;

    const currentInput = input;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentInput,
      timestamp: new Date()
    };

    setSessions(prev => prev.map(s => 
      s.id === activeSessionId 
        ? { 
            ...s, 
            messages: [...s.messages, userMessage],
            title: s.messages.length === 1 ? currentInput.slice(0, 30) + '...' : s.title,
            updatedAt: new Date() 
          }
        : s
    ));
    setInput('');
    setIsTyping(true);

    // Call HF via Vite proxy → router.huggingface.co (OpenAI-compatible endpoint)
    try {
      const token = import.meta.env.VITE_HF_TOKEN;
      if (!token) throw new Error("No HF token configured in .env");

      // Build chat messages from history
      const currentSession = sessions.find(s => s.id === activeSessionId);
      const history = (currentSession?.messages || []).slice(-10);
      const messages = [
        {
          role: 'system',
          content: 'You are a helpful AI tutor for KIRAN EDUTECH. Help students learn clearly and concisely.'
        },
        ...history.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: currentInput }
      ];

      // Use Vite proxy: /api/hf → router.huggingface.co
      const response = await fetch('/api/hf/hf-inference/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          model: 'mistralai/Mistral-7B-Instruct-v0.2',
          messages,
          max_tokens: 512,
          temperature: 0.7,
          stream: false
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API error ${response.status}: ${errText}`);
      }

      const result = await response.json();
      const aiResponseContent = result.choices?.[0]?.message?.content?.trim();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponseContent || "I couldn't generate a response. Please try again.",
        timestamp: new Date()
      };

      setSessions(prev => prev.map(s =>
        s.id === activeSessionId
          ? { ...s, messages: [...s.messages, aiMessage], updatedAt: new Date() }
          : s
      ));
    } catch (error) {
      console.error("AI API Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date()
      };
      setSessions(prev => prev.map(s =>
        s.id === activeSessionId
          ? { ...s, messages: [...s.messages, errorMessage], updatedAt: new Date() }
          : s
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Hello! How can I assist you in your learning journey today?',
          timestamp: new Date()
        }
      ],
      updatedAt: new Date()
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    if (activeSessionId === id) {
      setActiveSessionId(updated[0]?.id || null);
    }
  };

  return (
    <div className="animate-fade-in" style={{ 
      display: 'flex', 
      height: 'calc(100vh - 140px)', 
      margin: '1rem', 
      gap: '1rem',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <aside className="glass-panel" style={{ 
        width: '260px', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '1rem',
        flexShrink: 0
      }}>
        <button 
          onClick={createNewChat}
          className="glass-button" 
          style={{ width: '100%', marginBottom: '1rem', justifyContent: 'center' }}
        >
          <Plus size={18} /> New Chat
        </button>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {sessions.map(session => (
            <div 
              key={session.id}
              onClick={() => setActiveSessionId(session.id)}
              style={{
                padding: '0.75rem',
                borderRadius: '10px',
                cursor: 'pointer',
                background: activeSessionId === session.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s',
                position: 'relative'
              }}
              className="hover-trigger"
            >
              <MessageSquare size={16} color={activeSessionId === session.id ? 'var(--primary)' : 'var(--text-secondary)'} />
              <span style={{ 
                fontSize: '0.9rem', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                flex: 1
              }}>
                {session.title}
              </span>
              <button 
                onClick={(e) => deleteSession(session.id, e)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '2px',
                  opacity: activeSessionId === session.id ? 1 : 0
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <div style={{ padding: '1rem 0 0 0', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.5rem' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              background: 'var(--secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem'
            }}>
              {user?.name?.[0] || 'U'}
            </div>
            <span style={{ fontSize: '0.9rem' }}>{user?.name || 'Guest User'}</span>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="glass-panel" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        background: 'rgba(15, 23, 42, 0.4)'
      }}>
        {/* Header */}
        <header style={{ 
          padding: '1rem 1.5rem', 
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ margin: 0 }}>AI Tutor</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Powered by Advanced LLM</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Search size={18} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
            <Settings size={18} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
          </div>
        </header>

        {/* Messages */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {activeSession?.messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{
                display: 'flex',
                gap: '1.5rem',
                maxWidth: '850px',
                margin: '0 auto',
                width: '100%'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                background: msg.role === 'assistant' ? 'var(--primary)' : 'var(--secondary)'
              }}>
                {msg.role === 'assistant' ? <Bot size={20} color="white" /> : <User size={20} color="white" />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  {msg.role === 'assistant' ? 'AI Assistant' : 'You'}
                </div>
                <div style={{ 
                  lineHeight: '1.6', 
                  color: msg.role === 'assistant' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontSize: '1rem'
                }}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              maxWidth: '850px',
              margin: '0 auto',
              width: '100%'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={20} color="white" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-secondary)', animation: 'bounce 1s infinite' }}></div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-secondary)', animation: 'bounce 1s infinite 0.2s' }}></div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-secondary)', animation: 'bounce 1s infinite 0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{ 
          padding: '2rem 1.5rem', 
          background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.8))'
        }}>
          <form 
            onSubmit={handleSendMessage}
            style={{ 
              maxWidth: '850px', 
              margin: '0 auto', 
              position: 'relative',
              display: 'flex',
              gap: '10px'
            }}
          >
            <input 
              type="text" 
              className="glass-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your courses..."
              style={{ width: '100%', paddingRight: '50px' }}
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="glass-button"
              style={{ 
                padding: '0 15px',
                opacity: input.trim() ? 1 : 0.5,
                cursor: input.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              <Send size={18} />
            </button>
          </form>
          <div style={{ 
            textAlign: 'center', 
            marginTop: '0.75rem', 
            fontSize: '0.7rem', 
            color: 'var(--text-secondary)' 
          }}>
            AI can make mistakes. Consider checking important information.
          </div>
        </div>
      </main>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default AIChat;
