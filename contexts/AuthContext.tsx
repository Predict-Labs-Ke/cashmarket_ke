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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      try {
        const userData = JSON.parse(userSession);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        // Invalid session data, clear it
        localStorage.removeItem("userSession");
      }
    }
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
