'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('dashboardUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call - Demo credentials
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let userData: User | null = null;
    
    if (email === 'admin@dashboard.com' && password === 'admin123') {
      userData = {
        id: '1',
        name: 'System Administrator',
        email: 'admin@dashboard.com',
        role: 'admin'
      };
    } else if (email === 'actor@dashboard.com' && password === 'actor123') {
      userData = {
        id: '2',
        name: 'GU Group',
        email: 'actor@dashboard.com',
        role: 'actor',
        actorId: 'actor-1'
      };
    }
    
    if (userData) {
      setUser(userData);
      localStorage.setItem('dashboardUser', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dashboardUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}