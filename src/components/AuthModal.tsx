import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, signup } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(formData.email.split('@')[0] || 'User', formData.email);
    } else {
      signup(formData.name || 'New User', formData.email);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      zIndex: 2000, padding: '1rem'
    }} onClick={closeAuthModal}>
      <div 
        className="glass-panel animate-fade-in" 
        style={{ 
          width: '100%', maxWidth: '400px', padding: '2.5rem', 
          position: 'relative', border: '1px solid var(--glass-border)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={closeAuthModal}
          style={{ 
            position: 'absolute', top: '1rem', right: '1rem', 
            background: 'none', border: 'none', color: 'var(--text-secondary)',
            cursor: 'pointer' 
          }}
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {isLogin ? 'Welcome ' : 'Join '} 
            <span className="vibrant-text">Back</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isLogin ? 'Login to access your courses' : 'Create an account to start learning'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                className="glass-input"
                style={{ width: '100%', paddingLeft: '40px' }}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              className="glass-input"
              style={{ width: '100%', paddingLeft: '40px' }}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              className="glass-input"
              style={{ width: '100%', paddingLeft: '40px' }}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="glass-button" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem', background: 'var(--primary)', border: 'none', marginTop: '0.5rem' }}>
            {isLogin ? 'Login' : 'Sign Up'} <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: 'none', border: 'none', color: 'var(--primary)', 
              cursor: 'pointer', fontWeight: 'bold', padding: 0 
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;