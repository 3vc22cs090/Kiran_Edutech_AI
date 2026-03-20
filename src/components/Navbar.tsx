import React, { useState } from 'react';
import { Search, ShoppingCart, LogOut, Bot } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { cart, user, logout, openAuthModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
    }
  };

  return (
    <nav className="glass-panel" style={{ margin: '1rem', position: 'sticky', top: '1rem', zIndex: 1000, padding: '0.75rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="vibrant-text" style={{ fontSize: '1.5rem', margin: 0 }}>KIRAN EDUTECH</h1>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} style={{ display: 'flex', flex: 1, margin: '0 2rem', maxWidth: '500px' }}>
          <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search for courses..." 
              className="glass-input"
              style={{ width: '100%', paddingLeft: '40px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/chat" className="glass-button" style={{ 
            fontSize: '1rem', 
            padding: '12px 24px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
            border: 'none'
          }}>
            <Bot size={20} /> Chat with AI
          </Link>

          <Link to="/cart" style={{ position: 'relative', color: 'white', display: 'flex', alignItems: 'center' }}>
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span style={{ 
                position: 'absolute', top: '-8px', right: '-8px', 
                background: 'var(--accent)', color: 'white', 
                fontSize: '10px', borderRadius: '50%', 
                width: '18px', height: '18px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Hi, <b style={{ color: 'white' }}>{user.name}</b></span>
              <Link to="/enrolled-courses" className="glass-button" style={{ fontSize: '0.9rem' }}>Enrolled Courses</Link>
              <Link to="/my-learning" className="glass-button" style={{ fontSize: '0.9rem', background: 'transparent', border: '1px solid var(--glass-border)' }}>Continue Learning</Link>
              <button onClick={logout} className="glass-button" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={openAuthModal} 
                className="glass-button"
                style={{ background: 'transparent', border: '1px solid var(--glass-border)' }}
              >
                Login
              </button>
              <button 
                onClick={openAuthModal} 
                className="glass-button"
                style={{ background: 'var(--primary)', border: 'none' }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
