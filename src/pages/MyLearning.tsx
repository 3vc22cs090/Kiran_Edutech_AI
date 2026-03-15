import React from 'react';
import { useApp } from '../context/AppContext';
import { courses } from '../data/courses';
import CourseCard from '../components/CourseCard';
import { Clock } from 'lucide-react';

const MyLearning: React.FC = () => {
  const { history } = useApp();
  
  const historyData = history.map(hId => courses.find(c => c.id === hId)).filter(Boolean);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Continue <span className="vibrant-text">Learning</span></h1>
        
        {historyData.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <Clock size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
            <h3>No watch history yet</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Courses you watch will appear here!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {historyData.map(course => course && (
              <CourseCard key={`history-${course.id}`} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
