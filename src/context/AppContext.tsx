import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  enrolledCourses: string[];
  enrollInCourse: (id: string) => void;
  user: { name: string; email: string } | null;
  login: (name: string, email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  history: string[];
  addToHistory: (id: string) => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const savedUser = localStorage.getItem('lms_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [history, setHistory] = useState<string[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Load user-specific data on login or mount
  useEffect(() => {
    if (user) {
      const userData = localStorage.getItem(`lms_data_${user.email}`);
      if (userData) {
        const parsed = JSON.parse(userData);
        setCart(parsed.cart || []);
        setEnrolledCourses(parsed.enrolledCourses || []);
        setHistory(parsed.history || []);
      } else {
        setCart([]);
        setEnrolledCourses([]);
        setHistory([]);
      }
      localStorage.setItem('lms_current_user', JSON.stringify(user));
      setIsDataLoaded(true);
    } else {
      localStorage.removeItem('lms_current_user');
      setCart([]);
      setEnrolledCourses([]);
      setHistory([]);
      setIsDataLoaded(false);
    }
  }, [user]);

  // Persist state changes - only run if data has been fully loaded for the current user
  useEffect(() => {
    if (user && isDataLoaded) {
      const dataToSave = { cart, enrolledCourses, history };
      localStorage.setItem(`lms_data_${user.email}`, JSON.stringify(dataToSave));
    }
  }, [cart, enrolledCourses, history, user, isDataLoaded]);

  const addToCart = (item: CartItem) => {
    if (!cart.find(i => i.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const enrollInCourse = (id: string) => {
    if (!enrolledCourses.includes(id)) {
      setEnrolledCourses([...enrolledCourses, id]);
    }
  };

  const login = (name: string, email: string) => {
    setIsDataLoaded(false);
    setUser({ name, email });
    setIsAuthModalOpen(false);
  };

  const signup = (name: string, email: string) => {
    setIsDataLoaded(false);
    setUser({ name, email });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setIsDataLoaded(false);
    setUser(null);
  };

  const addToHistory = (id: string) => {
    setHistory(prev => [id, ...prev.filter(i => i !== id)].slice(0, 10));
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AppContext.Provider value={{ 
      cart, addToCart, removeFromCart, 
      enrolledCourses, enrollInCourse, 
      user, login, signup, logout,
      history, addToHistory,
      isAuthModalOpen, openAuthModal, closeAuthModal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
