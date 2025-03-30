
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define types for our context
type User = {
  id: string;
  name: string;
  email: string;
  photoURL: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isFirstTimeUser: boolean;
  setIsFirstTimeUser: (value: boolean) => void;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  isFirstTimeUser: false,
  setIsFirstTimeUser: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Mock authentication for now - in a real app, this would use Firebase
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

  // Simulate loading the user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('trash2tech_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock Google sign-in
  const signInWithGoogle = async () => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create mock user
    const mockUser = {
      id: 'user123',
      name: 'Demo User',
      email: 'demo@trash2tech.com',
      photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=34A853&color=fff'
    };
    
    // Save to state and localStorage
    setUser(mockUser);
    localStorage.setItem('trash2tech_user', JSON.stringify(mockUser));
    
    // Check if first time user
    const hasVisitedBefore = localStorage.getItem('trash2tech_visited');
    if (!hasVisitedBefore) {
      setIsFirstTimeUser(true);
      localStorage.setItem('trash2tech_visited', 'true');
    }
    
    setLoading(false);
  };

  // Mock sign out
  const signOut = async () => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Clear from state and localStorage
    setUser(null);
    localStorage.removeItem('trash2tech_user');
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signInWithGoogle, 
      signOut,
      isFirstTimeUser,
      setIsFirstTimeUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
