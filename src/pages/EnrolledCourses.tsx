import React from 'react';
import { useApp } from '../context/AppContext';
import { courses } from '../data/courses';
import CourseCard from '../components/CourseCard';
import { BookOpen } from 'lucide-react';

const EnrolledCourses: React.FC = () => {
  const { enrolledCourses } = useApp();
  
  const enrolledData = courses.filter(c => enrolledCourses.includes(c.id));

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Enrolled <span className="vibrant-text">Courses</span></h1>
        
        {enrolledData.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <BookOpen size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
            <h3>No courses enrolled yet</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Start your learning journey by enrolling in a course!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {enrolledData.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
