import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import Cart from './pages/Cart';
import MyLearning from './pages/MyLearning';
import EnrolledCourses from './pages/EnrolledCourses';

import AuthModal from './components/AuthModal';
import AIChat from './pages/AIChat';

function App() {
  return (
    <AppProvider>
      <AuthModal />
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/my-learning" element={<MyLearning />} />
              <Route path="/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="/chat" element={<AIChat />} />
            </Routes>
          </main>
          
          <footer className="glass-panel" style={{ margin: '2rem 1rem 1rem 1rem', padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              © 2026 KIRAN EDUTECH. Built with glassmorphism and passion.
            </p>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
