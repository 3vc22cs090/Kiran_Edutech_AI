import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { courses } from '../data/courses';
import CourseCard from '../components/CourseCard';

const Home: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Fullstack', 'Python', 'Java', 'DSA', 'SQL', 'C', 'C++', 'Design', 'ML/AI', 'JavaScript'];

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }} className="animate-fade-in">
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Ignite Your <span className="vibrant-text">Future</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore world-class courses designed by industry experts at Kiran Edutech.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="glass-button"
            style={{ 
              background: activeCategory === cat ? 'var(--primary)' : 'var(--surface)',
              border: '1px solid ' + (activeCategory === cat ? 'transparent' : 'var(--glass-border)'),
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredCourses.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <h2>No courses found for "{searchQuery}"</h2>
          <p>Try searching for something else or browse categories.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
