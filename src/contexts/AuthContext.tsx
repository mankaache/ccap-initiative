// src/contexts/AuthContext.jsx
"use client"; // if using Next.js app router
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/clientApp";
import { attachAuthListener, logout } from "../firebase/authApi";
import { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = attachAuthListener((u:any) => {
      setUser(u);           // u is null or a User object
      setLoading(false);
      
      console.log("auth change -> user:", u);
    });
    return unsubscribe;
  }, []);

  const signOut = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
