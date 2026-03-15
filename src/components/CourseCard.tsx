import React, { useState } from 'react';
import { Play, ShoppingCart, CheckCircle, Lock, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { Course } from '../data/courses';
import { useApp } from '../context/AppContext';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { addToCart, cart, enrolledCourses, enrollInCourse, user, openAuthModal } = useApp();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const isInCart = cart.some(item => item.id === course.id);
  const isEnrolled = enrolledCourses.includes(course.id);

  const handleEnrollClick = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setIsProcessing(true);
    setError('');

    // Simulate enrollment processing
    setTimeout(() => {
      setIsProcessing(false);
      enrollInCourse(course.id);
      setShowConfirmModal(false);
      navigate('/my-learning');
    }, 1500);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      openAuthModal();
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ overflow: 'hidden', transition: 'all 0.3s ease', position: 'relative' }}>
      <Link to={`/course/${course.id}`} onClick={handleCardClick} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            style={{ 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
              filter: !user ? 'grayscale(0.8) blur(2px)' : 'none'
            }}
          />
          {!user && (
            <div style={{ 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
              background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center'
            }}>
              <Lock size={32} color="white" style={{ marginBottom: '0.5rem' }} />
              <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>Login to Unlock</span>
            </div>
          )}
          <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0, transition: 'opacity 0.3s ease'
          }} className="card-overlay">
            <Play size={48} color="white" fill="white" />
          </div>
        </div>
      </Link>
      
      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', background: 'var(--surface)', padding: '4px 10px', borderRadius: '20px', color: 'var(--text-secondary)' }}>
            {course.category}
          </span>
          <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1.1rem' }}>₹{course.price}</span>
        </div>
        
        <Link to={`/course/${course.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', height: '2.8rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {course.title}
          </h3>
        </Link>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>By {course.instructor}</p>
        
        {isEnrolled ? (
          <Link to={`/course/${course.id}`} className="glass-button" style={{ width: '100%', justifyContent: 'center', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981' }}>
            <CheckCircle size={18} /> Enrolled
          </Link>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              disabled={isInCart}
              onClick={() => addToCart({ id: course.id, title: course.title, price: course.price, thumbnail: course.thumbnail })}
              className="glass-button" 
              style={{ flex: 1, justifyContent: 'center', opacity: isInCart ? 0.7 : 1, padding: '0.5rem' }}
              title={isInCart ? 'In Cart' : 'Add to Cart'}
            >
              <ShoppingCart size={18} />
            </button>
            <button 
              onClick={handleEnrollClick}
              className="glass-button" 
              style={{ flex: 2, justifyContent: 'center', background: 'var(--primary)', border: 'none' }}
            >
              Enroll Now
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: '1rem'
        }}>
          <div className="glass-panel animate-fade-in" style={{ padding: '2rem', width: '100%', maxWidth: '400px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
            {isProcessing ? (
              <div style={{ padding: '2rem' }}>
                <div className="spinning" style={{ width: '40px', height: '40px', border: '4px solid var(--surface)', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 1.5rem auto' }}></div>
                <h3>Enrolling...</h3>
              </div>
            ) : (
              <>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <CreditCard color="var(--primary)" size={24} />
                </div>
                <h3>Confirm Enrollment</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Enroll in <b>{course.title}</b> for ₹{course.price}</p>
                
                <form onSubmit={handleConfirmEnroll}>
                  <div style={{ position: 'relative', textAlign: 'left', marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>Confirm Password</label>
                    <div style={{ position: 'relative', marginTop: '4px' }}>
                      <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                      <input 
                        type="password" 
                        className="glass-input" 
                        style={{ width: '100%', paddingLeft: '36px' }}
                        placeholder="Type your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '4px' }}>{error}</p>}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="button" onClick={() => setShowConfirmModal(false)} className="glass-button" style={{ flex: 1, background: 'transparent', border: '1px solid var(--glass-border)' }}>Cancel</button>
                    <button type="submit" className="glass-button" style={{ flex: 1, background: 'var(--primary)', border: 'none' }}>Enroll</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .glass-panel:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
          border-color: var(--primary);
        }
        .glass-panel:hover .card-overlay {
          opacity: 1 !important;
        }
        .spinning {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CourseCard;
