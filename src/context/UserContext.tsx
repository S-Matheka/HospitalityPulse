import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  role: string;
  isAuthenticated: boolean;
  firstName: string;
  lastLoginAt?: number;
}

interface UserContextType {
  user: User | null;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  checkAuth: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  const checkAuth = (): boolean => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return false;

    try {
      const parsedUser = JSON.parse(savedUser);
      if (!parsedUser || !parsedUser.isAuthenticated || !parsedUser.lastLoginAt) {
        localStorage.removeItem('user');
        return false;
      }

      // Check if the session has expired
      const now = Date.now();
      const sessionExpired = now - parsedUser.lastLoginAt > SESSION_DURATION;

      if (sessionExpired) {
        localStorage.removeItem('user');
        setUser(null);
        return false;
      }

      return true;
    } catch (e) {
      localStorage.removeItem('user');
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser && checkAuth()) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } catch (e) {
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the first part of email (before . or @)
      const firstName = email.split(/[.@]/)[0];
      // Capitalize first letter
      const name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      
      const newUser = {
        email,
        name,
        role: 'admin',
        isAuthenticated: true,
        firstName: name,
        lastLoginAt: Date.now()
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading, checkAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 