import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../data/courses';
import { useApp } from '../context/AppContext';
import { Play, ShieldCheck, CreditCard, Lock } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === id);
  const { enrolledCourses, enrollInCourse, addToHistory, user, openAuthModal } = useApp();
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Add to history if enrolled and user is visiting
  useEffect(() => {
    if (user && course && enrolledCourses.includes(course.id)) {
      addToHistory(course.id);
    }
  }, [id, enrolledCourses, user, addToHistory, course]);

  if (!course) return <div style={{ padding: '2rem', textAlign: 'center' }}>Course not found</div>;

  if (!user) {
    return (
      <div style={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        height: '60vh', textAlign: 'center', padding: '2rem' 
      }}>
        <Lock size={64} style={{ color: 'var(--primary)', marginBottom: '1.5rem' }} />
        <h1 style={{ marginBottom: '1rem' }}>Access Locked</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px' }}>
          Please login to view course details and start your learning journey.
        </p>
        <button onClick={openAuthModal} className="glass-button" style={{ padding: '12px 40px' }}>
          Login Now
        </button>
      </div>
    );
  }

  const isEnrolled = enrolledCourses.includes(course.id);

  const handleEnroll = () => {
    setShowPaymentModal(true);
  };

  const processPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    
    setIsProcessing(true);
    setError('');
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      enrollInCourse(course.id);
      addToHistory(course.id);
      setShowPaymentModal(false);
    }, 2000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
        <div className="animate-fade-in">
          <div className="glass-panel" style={{ padding: '0.5rem', marginBottom: '2rem' }}>
            <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '12px', overflow: 'hidden' }}>
              <iframe 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/${course.youtubeId}?autoplay=${isEnrolled ? 1 : 0}`}
                title={course.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {!isEnrolled && (
                <div style={{ 
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                  background: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', textAlign: 'center'
                }}>
                  <Play size={64} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                  <h3>Enroll to Unlocks this Course</h3>
                  <button onClick={handleEnroll} className="glass-button" style={{ marginTop: '1rem', padding: '12px 30px' }}>
                    Enroll Now - ₹{course.price}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{course.title}</h1>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            <span>Instructor: {course.instructor}</span>
            <span>•</span>
            <span>Category: {course.category}</span>
          </div>
          
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>About this Course</h2>
            <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)' }}>{course.description}</p>
          </div>
        </div>

        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Course Content</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--surface)', borderRadius: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                    {i}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Module {i}: Introduction to Topic</span>
                  </div>
                  <ShieldCheck size={18} style={{ color: isEnrolled ? '#10b981' : 'var(--text-secondary)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                <h2>Processing Payment...</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Verifying your secure transaction</p>
              </div>
            ) : (
              <>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <CreditCard color="var(--primary)" size={32} />
                </div>
                <h2 style={{ marginBottom: '0.5rem' }}>Enrollment Payment</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>You are enrolling in <b>{course.title}</b> for ₹{course.price}</p>
                
                <form onSubmit={processPayment}>
                  <div style={{ position: 'relative', textAlign: 'left', marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>Confirm Password</label>
                    <div style={{ position: 'relative', marginTop: '4px' }}>
                      <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                      <input 
                        type="password" 
                        className="glass-input" 
                        style={{ width: '100%', paddingLeft: '40px' }}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {error && <p style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</p>}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={() => setShowPaymentModal(false)} className="glass-button" style={{ flex: 1, background: 'transparent', border: '1px solid var(--glass-border)' }}>Cancel</button>
                    <button type="submit" className="glass-button" style={{ flex: 1 }}>Pay Now</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
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

export default CourseDetail;
