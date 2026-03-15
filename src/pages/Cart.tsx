import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, ShoppingBag, CreditCard, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, enrollInCourse, addToHistory } = useApp();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      cart.forEach(item => {
        enrollInCourse(item.id);
        addToHistory(item.id);
        removeFromCart(item.id);
      });
      setIsProcessing(false);
      setShowPaymentModal(false);
    }, 2000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Shopping <span className="vibrant-text">Cart</span></h1>
      
      {cart.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            <ShoppingBag size={64} style={{ margin: '0 auto' }} />
          </div>
          <h2>Your cart is empty</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Browse our courses and start learning today!</p>
          <Link to="/" className="glass-button" style={{ display: 'inline-flex', margin: '0 auto' }}>Explore Courses</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map(item => (
              <div key={item.id} className="glass-panel animate-fade-in" style={{ padding: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <img src={item.thumbnail} alt={item.title} style={{ width: '120px', borderRadius: '8px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: '700' }}>₹{item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '10px' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Summary</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Original Price:</span>
                <span>₹{total}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span className="vibrant-text">₹{total}</span>
              </div>
              <button onClick={() => setShowPaymentModal(true)} className="glass-button" style={{ width: '100%', justifyContent: 'center', padding: '15px' }}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal Reuse (simplified logic here for focus) */}
      {showPaymentModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 
        }}>
          <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem', width: '90%', maxWidth: '400px', textAlign: 'center' }}>
            {isProcessing ? (
              <div style={{ padding: '2rem' }}>
                <div className="spinning" style={{ width: '50px', height: '50px', border: '5px solid var(--surface)', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 1.5rem auto' }}></div>
                <h2>Processing...</h2>
              </div>
            ) : (
              <>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <CreditCard color="var(--primary)" size={32} />
                </div>
                <h2>Confirm Checkout</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Total Amount: ₹{total}</p>
                <form onSubmit={handleCheckout}>
                  <div style={{ position: 'relative', textAlign: 'left', marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Confirm Password</label>
                    <div style={{ position: 'relative', marginTop: '4px' }}>
                      <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                      <input type="password" className="glass-input" style={{ width: '100%', paddingLeft: '40px' }} required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={() => setShowPaymentModal(false)} className="glass-button" style={{ flex: 1, background: 'transparent', border: '1px solid var(--glass-border)' }}>Cancel</button>
                    <button type="submit" className="glass-button" style={{ flex: 1 }}>Confirm</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      <style>{`
        .spinning { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Cart;
