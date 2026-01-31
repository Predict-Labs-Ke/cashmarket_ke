"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  user: {
    name: string;
    avatar: string;
  } | null;
  login: (userData: { name: string; avatar: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get initial auth state from localStorage
function getInitialAuthState() {
  if (typeof window === 'undefined') {
    return { isLoggedIn: false, user: null };
  }
  
  const userSession = localStorage.getItem("userSession");
  if (userSession) {
    try {
      const userData = JSON.parse(userSession);
      return { isLoggedIn: true, user: userData };
    } catch {
      localStorage.removeItem("userSession");
    }
  }
  return { isLoggedIn: false, user: null };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const initialState = getInitialAuthState();
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(initialState.user);
  const router = useRouter();

  // Mark as mounted after first render
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const login = (userData: { name: string; avatar: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("userSession", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userSession");
    router.push("/");
  };

  // Don't render children until we've checked for existing session
  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
